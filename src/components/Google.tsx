'use client'
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker, Autocomplete, DirectionsRenderer } from '@react-google-maps/api';
import { ToastContainer, toast } from "react-toastify";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import "react-toastify/dist/ReactToastify.css";

import Loder from './Loder';
import axios from 'axios';
import ScheduleModal from './ScheduleModal';
import Sidebar from './Sidebar';
import logo from '../../public/lan-fp.png'
import Image from 'next/image';
import Link from 'next/link';


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
    distance: string;
    duration: string;
    day: string;
  };
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
  const [newBusyTime, setNewBusyTime] = useState<BusyTime>({ start: '', end: '' });

  const [currentTask, setCurrentTask] = useState<Task>({
    address: '',
    deadline: '',
    position: { lat: 0, lng: 0 },
  });
  const [busyTimes, setBusyTimes] = useState<BusyTime[]>([]);
  const [directionsRenderer, setDirectionsRenderer] = useState<google.maps.DirectionsRenderer | null>(null);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);

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
        if (status === "OK" && results && results[0]) {
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

  const handleAddBusyTime = () => {
    if (newBusyTime.start && newBusyTime.end) {
      setBusyTimes([...busyTimes, newBusyTime]);
      setNewBusyTime({ start: '', end: '' });
      toast.success("Busy time added successfully!");
    } else {
      toast.error("Please set both start and end times");
    }
  };

  const handleNewBusyTimeChange = (field: 'start' | 'end', value: string) => {
    setNewBusyTime({ ...newBusyTime, [field]: value });
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
                  if (status === google.maps.DirectionsStatus.OK && result) {
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
                distance: route.legs[0].distance?.text || "",
                duration: route.legs[0].duration?.text || "",
                bestRouteName: route.summary,
              };
            }
          } catch (error) {
            console.error("Error fetching route:", error);
          }
        }
      }

      if (bestDeparture && !isOverlap(bestDeparture, scheduledTasks.filter((t): t is Task & Required<Pick<Task, 'arrivalTime' | 'departureTime'>> => t.arrivalTime !== undefined && t.departureTime !== undefined))) {
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
    // if (scheduledTasks.length > 0) {
    //   setTaskList(scheduledTasks);
    //   await saveTasksToDatabase(scheduledTasks);}

    setTaskList(scheduledTasks);
    setIsScheduleModalOpen(true);



    if (directionsRenderer) {
      directionsRenderer.setMap(null);
    }

    
    
    
     
    
    // show directions on the map
    scheduledTasks.forEach(task => {
      const request: google.maps.DirectionsRequest = {
        origin: homeLocation.address,
        destination: task.address,
        travelMode: google.maps.TravelMode.DRIVING,
        optimizeWaypoints: false,
      };

      directionsService.route(request, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK && result) {
          const renderer = new google.maps.DirectionsRenderer();
          renderer.setMap(mapRef.current || null);
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
    <>
   
  
  
    <div className="flex flex-row-reverse h-screen overflow-hidden  ">
      <div className="w-svw h-full ">
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
      <Card className="w-1/3 h-full overflow-y-scroll">
        <CardHeader>
          <CardTitle>
            <Link href='/'><Image src={logo} alt='' width={90}/>
            </Link>
            
            </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <Button onClick={handleSetHomeClick} className="w-full bg-[#9685CF]">
            Set Home Location
          </Button>
          {homeLocation && (
            <div>
              <h3 className="font-semibold">Home Location:</h3>
              <p>{homeLocation.address}</p>
            </div>
          )}
          <Separator />
          <form onSubmit={(e) => { e.preventDefault(); handleAddTask(); }} className="space-y-4">
            <Autocomplete>
              <Input
                type="text"
                name="address"
                value={currentTask.address}
                onChange={handleTaskInputChange}
                placeholder="Enter task location"
              />
            </Autocomplete>
            <Input
              type="datetime-local"
              name="deadline"
              value={currentTask.deadline}
              onChange={handleTaskInputChange}
            />
            <Button type="submit" className="w-full bg-[#9685CF] ">Add Task</Button>
          </form>
          <Separator />
          <div>
            <h3 className="font-semibold mb-2">Tasks:</h3>
            <ScrollArea className="h-40">
              <ul className="space-y-2">
                {taskList.map((task, index) => (
                  <li key={index} className="flex items-center justify-between bg-secondary p-2 rounded">
                    <span>{task.address} - {new Date(task.deadline).toLocaleString()}</span>
                    <Button variant="destructive" size="sm" onClick={() => handleDeleteTask(index)}>
                      Delete
                    </Button>
                  </li>
                ))}
              </ul>
            </ScrollArea>
          </div>
          <Separator />
          <div>
          <h3 className="font-semibold mb-2">Busy Time:</h3>
  <div className="flex items-center space-x-2">
    <Input
      type="time"
      value={newBusyTime.start}
      onChange={(e) => handleNewBusyTimeChange('start', e.target.value)}
      className="w-24"
    />
    <span>-</span>
    <Input
      type="time"
      value={newBusyTime.end}
      onChange={(e) => handleNewBusyTimeChange('end', e.target.value)}
      className="w-24"
    />
    <Button className='bg-[#9685CF]' onClick={handleAddBusyTime}>Add</Button>
  </div>
  <ScrollArea className="h-40 mt-2">
    <ul className="space-y-2">
      {busyTimes.map((busyTime, index) => (
        <li key={index} className="flex items-center justify-between bg-secondary p-2 rounded">
          <span>{busyTime.start} - {busyTime.end}</span>
          <Button variant="destructive" size="sm" onClick={() => handleDeleteBusyTime(index)}>
            Delete
          </Button>
        </li>
      ))}
    </ul>
  </ScrollArea>
            
          </div>
          <Separator />
          <Button onClick={calculateBestTime} className="w-full bg-[#9685CF]">Calculate Route</Button>
        </CardContent>
      </Card>
      <ToastContainer />

      <ScheduleModal
        taskList={taskList}
        onClose={() => setIsScheduleModalOpen(false)}
        isOpen={isScheduleModalOpen}
      />
    </div>
  

    </>
  );
};

export default Google;