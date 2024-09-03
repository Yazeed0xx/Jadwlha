'use client'
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker, Autocomplete, DirectionsRenderer } from '@react-google-maps/api';
import { toast } from 'react-toastify';
import Loder from './Loder';

const libraries: ("places")[] = ["places"];

interface Location {
  address: string;
  position: { lat: number; lng: number };
}

interface Task {
  address: string;
  deadline: string;
  position: { lat: number; lng: number };
  routeDetails?: {
    bestTime: Date;
    bestRoute: string;
    distance: string ;
    duration: string;
    day: string;
  };
  //its optinal dont change it
  departureTime?: Date;
  arrivalTime?: Date;
}

interface BusyTime {
  start: string;
  end: string;
}

const center = {
  lat: 24.7136, 
  lng: 46.6753,
};

const Google: React.FC = () => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);
  const [homeLocation, setHomeLocation] = useState<Location | null>(null);
  const [isSettingHome, setIsSettingHome] = useState(false);
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [currentTask, setCurrentTask] = useState<Task>({
    address: '',
    deadline: '',
    position: { lat: 0, lng: 0 },
  });
  const [busyTimes, setBusyTimes] = useState<BusyTime[]>([]);
  const [directionsRenderer, setDirectionsRenderer] = useState<google.maps.DirectionsRenderer | null>(null);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP as string,
    libraries: libraries,
  });

  const mapRef = useRef<google.maps.Map>();
  const onMapLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
    setMap(map);
  }, []);

  const handleMapClick = useCallback((event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const clickedPosition = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      };

      markers.forEach(marker => marker.setMap(null));

      // Add new marker
      const newMarker = new google.maps.Marker({
        position: clickedPosition,
        map: mapRef.current,
      });

      setMarkers([newMarker]);
      
  

 

      // handlet for thehome location or current task
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ location: clickedPosition }, (results, status) => {
        if (status === "OK" && results[0]) {
          if (isSettingHome) {
            setHomeLocation({
              address: results[0].formatted_address,
              position: clickedPosition,
            });
            setIsSettingHome(false);
            toast.success("Home location set successfully!");
          } else {
            setCurrentTask({
              ...currentTask,
              address: results[0].formatted_address,
              position: clickedPosition,
            });
          }
        }
      });
    }
  }, [markers, isSettingHome, currentTask]);

  const handleSetHomeClick = () => {
    setIsSettingHome(true);
    toast.info("Click on the map to set your home location");
  };

  const handleTaskInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCurrentTask({ ...currentTask, [name]: value });
  };

  const handleAddTask = () => {
    if (currentTask.address && currentTask.deadline) {
      setTaskList([...taskList, currentTask]);
      setCurrentTask({
        address: '',
        deadline: '',
        position: { lat: 0, lng: 0 },
      });
      toast.success("Task added successfully!");
    } else {
      toast.error("all task detils are requierd ");
    }
  };

  const handleAddBusyTime = (newBusyTime: BusyTime) => {
    setBusyTimes([...busyTimes, newBusyTime]);
  };

  const calculateBestTime = useCallback(async () => {
    if (!homeLocation) {
      toast.error("Please set your home location first");
      return;
    }
  
    if (taskList.length === 0) {
      toast.error("Please add tasks before scheduling");
      return;
    }
  
    const directionsService = new google.maps.DirectionsService();
    
    const isTimeBusy = (time: Date) => {
      return busyTimes.some((busyTime) => {
        const [busyStartHours, busyStartMinutes] = busyTime.start.split(':').map(Number);
        const [busyEndHours, busyEndMinutes] = busyTime.end.split(':').map(Number);
  
        const busyStartTime = new Date(time);
        busyStartTime.setHours(busyStartHours, busyStartMinutes, 0, 0);
  
        const busyEndTime = new Date(time);
        busyEndTime.setHours(busyEndHours, busyEndMinutes, 0, 0);
  
        return time >= busyStartTime && time <= busyEndTime;
      });
    };
  
    const isOverlap = (newTask: { arrivalTime: Date; departureTime: Date }, existingTasks: { arrivalTime: Date; departureTime: Date }[] = []) => {
      return existingTasks.some(
        (task) =>
          newTask.arrivalTime >= task.departureTime &&
          newTask.departureTime <= task.arrivalTime
      );
    };
  
    const scheduledTasks: Task[] = [];
    const now = new Date();
  
    for (const task of taskList) {
      let bestDeparture: { departureTime: Date; arrivalTime: Date; totalDurationInTraffic: number; distance: string; duration: string; bestRouteName: string } | null = null;
  
      for (let day = 0; day < 7; day++) {
        for (let hour = 0; hour < 24; hour++) {
          const departureTime = new Date(now.getTime());
          departureTime.setDate(now.getDate() + day);
          departureTime.setHours(hour, 0, 0, 0);
  
          const deadline = new Date(task.deadline);
          if (departureTime > deadline) continue;
          if (isTimeBusy(departureTime)) continue;
  
          try {
            const result = await new Promise<google.maps.DirectionsResult>((resolve, reject) => {
              directionsService.route(
                {
                  origin: homeLocation.address,
                  destination: task.address,
                  travelMode: google.maps.TravelMode.DRIVING,
                  drivingOptions: {
                    departureTime,
                    trafficModel: google.maps.TrafficModel.BEST_GUESS,
                  },
                },
                (result, status) => {
                  if (status === google.maps.DirectionsStatus.OK) {
                    resolve(result);
                  } else {
                    reject(status);
                  }
                }
              );
            });
  
            const route = result.routes[0];
            const totalDurationInTraffic = route.legs.reduce(
              (total, leg) => total + (leg.duration_in_traffic?.value || 0),
              0
            );
            const arrivalTime = new Date(departureTime.getTime() + totalDurationInTraffic * 1000);
  
            if (
              !bestDeparture ||
              totalDurationInTraffic < bestDeparture.totalDurationInTraffic
            ) {
              bestDeparture = {
                departureTime,
                arrivalTime,
                totalDurationInTraffic,
                distance: route.legs[0].distance.text,
                duration: route.legs[0].duration.text,
                bestRouteName: route.summary,
              };
            }
          } catch (error) {
            console.error("Error fetching route:", error);
          }
        }
      }
  
      if (bestDeparture && !isOverlap(bestDeparture, scheduledTasks)) {
        scheduledTasks.push({
          ...task,
          routeDetails: {
            bestTime: bestDeparture.departureTime,
            bestRoute: bestDeparture.bestRouteName,
            distance: bestDeparture.distance,
            duration: bestDeparture.duration,
            day: bestDeparture.departureTime.toLocaleString('en-GB', { weekday: 'long' }),
          },
          departureTime: bestDeparture.departureTime,
          arrivalTime: bestDeparture.arrivalTime,
        });
      }
    }
  
    setTaskList(scheduledTasks);
  
    if (directionsRenderer) {
      directionsRenderer.setMap(null);
    }
  
    //  show directions on the map
    scheduledTasks.forEach(task => {
      const request: google.maps.DirectionsRequest = {
        origin: homeLocation.address,
        destination: task.address,
        travelMode: google.maps.TravelMode.DRIVING,
        optimizeWaypoints: false, 
      };
  
      directionsService.route(request, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          const renderer = new google.maps.DirectionsRenderer();
          renderer.setMap(mapRef.current);
          renderer.setDirections(result);
        }
      });
    });
  
    toast.success("Tasks scheduled successfully!");
  }, [taskList, busyTimes, homeLocation, directionsRenderer]);
  // edit and delete handler
  const handleDeleteTask = (index: number) => {
    const newTaskList = [...taskList];
    newTaskList.splice(index, 1);
    setTaskList(newTaskList);
    toast.success("Task deleted successfully!");
  };

  
  const handleEditBusyTime = (index: number, field: 'start' | 'end', value: string) => {
    const newBusyTimes = [...busyTimes];
    newBusyTimes[index][field] = value;
    setBusyTimes(newBusyTimes);
  };
  const handleDeleteBusyTime = (index: number) => {
    const newBusyTimes = [...busyTimes];
    newBusyTimes.splice(index, 1);
    setBusyTimes(newBusyTimes);
    toast.success("Busy time deleted successfully!");
  };

  useEffect(() => {
    if (isLoaded && map) {
      const renderer = new google.maps.DirectionsRenderer();
      renderer.setMap(map);
      setDirectionsRenderer(renderer);
    }
  }, [isLoaded, map]);

  if (!isLoaded) return <div><Loder/></div>;

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-grow flex">
        <div className="w-2/3 h-full">
          <GoogleMap
            mapContainerStyle={{ width: '100%', height: '100%' }}
            center={homeLocation?.position || center}
            zoom={10}
            onLoad={onMapLoad}
            onClick={handleMapClick}
          >
            {markers.map((marker, index) => (
              <Marker
                key={index}
                position={{ lat: marker.getPosition()!.lat(), lng: marker.getPosition()!.lng() }}
              />
            ))}
            {homeLocation && (
              <Marker
                position={homeLocation.position}
                icon={{
                  url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
                }}
              />
            )}
          </GoogleMap>
        </div>
        <div className="w-1/3 p-4 overflow-y-auto">
          <button
            onClick={handleSetHomeClick}
            className="mb-4 bg-green-500 text-white p-2 rounded"
          >
            Set Home Location
          </button>
          {homeLocation && (
            <div className="mb-4">
              <h3 className="font-bold">Home Location:</h3>
              <p>{homeLocation.address}</p>
            </div>
          )}
          <form onSubmit={(e) => { e.preventDefault(); handleAddTask(); }}>
            <div className="mb-4">
              <Autocomplete>
                <input
                  type="text"
                  name="address"
                  value={currentTask.address}
                  onChange={handleTaskInputChange}
                  placeholder="Enter task location"
                  className="w-full p-2 border rounded"
                />
              </Autocomplete>
            </div>
            <div className="mb-4">
              <input
                type="datetime-local"
                name="deadline"
                value={currentTask.deadline}
                onChange={handleTaskInputChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded"
            >
              Add Task
            </button>
          </form>
          <div className="mt-4">
        <h3 className="font-bold text-lg mb-2">Tasks:</h3>
        <ul className="space-y-2">
          {taskList.map((task, index) => (
            <li key={index} className="flex items-center justify-between bg-gray-100 p-2 rounded">
              <span>{task.address} - {new Date(task.deadline).toLocaleString()}</span>
              <button
                onClick={() => handleDeleteTask(index)}
                className="bg-red-500 text-white p-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-4">
        <h3 className="font-bold text-lg mb-2">Busy Times:</h3>
        <ul className="space-y-2">
          {busyTimes.map((busyTime, index) => (
            <li key={index} className="flex items-center space-x-2 bg-gray-100 p-2 rounded">
              <input
                type="time"
                value={busyTime.start}
                onChange={(e) => handleEditBusyTime(index, 'start', e.target.value)}
                className="p-1 border rounded"
              />
              <span>-</span>
              <input
                type="time"
                value={busyTime.end}
                onChange={(e) => handleEditBusyTime(index, 'end', e.target.value)}
                className="p-1 border rounded"
              />
              <button
                onClick={() => handleDeleteBusyTime(index)}
                className="bg-red-500 text-white p-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
        <div className="mt-2">
          <input
            type="time"
            onChange={(e) => handleAddBusyTime({ start: e.target.value, end: '' })}
            className="w-full p-2 border rounded mt-2"
          />
        </div>
      </div>
        </div>
      </div>
      <button className='btn bg-red-400' onClick={calculateBestTime}>calculateRoute</button>
      <div className="mt-4">
        <h3 className="font-bold text-lg mb-2">Scheduled Tasks:</h3>
        <ul className="space-y-4">
          {taskList.map((task, index) => (
            <li key={index} className="bg-white shadow-md rounded-lg p-4">
              <h4 className="font-semibold text-lg mb-2">{task.address}</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="font-medium">Departure:</span> {task.departureTime?.toLocaleString()}
                </div>
                <div>
                  <span className="font-medium">Arrival:</span> {task.arrivalTime?.toLocaleString()}
                </div>
                <div>
                  <span className="font-medium">Route:</span> {task.routeDetails?.bestRoute}
                </div>
                <div>
                  <span className="font-medium">Distance:</span> {task.routeDetails?.distance}
                </div>
                <div>
                  <span className="font-medium">Duration:</span> {task.routeDetails?.duration}
                </div>
                <div>
                  <span className="font-medium">Day:</span> {task.routeDetails?.day}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Google;