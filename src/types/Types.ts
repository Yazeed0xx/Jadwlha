export interface User{
    firstname: string
    lastname:string
    email : string
    password : string
    phone: string
}

export interface Model{
    Showmodel : boolean
}

export interface Location {
    address: string;
    deadline: string;
    position: { lat: number | null; lng: number | null };
    photoUrl?: string;
  }
  
  export interface BusyTime {
    start: string;
    end: string;
  }
  
  export interface RouteInfo {
    validResults: RouteResult[];
    origin: string;
    destinations: string[];
    scheduledTasks: ScheduledTask[];
  }
  
  export interface RouteResult {
    destinationIndex: number;
    departureTime: Date;
    totalDurationInTraffic: number;
    arrivalTime: Date;
    distance: string;
    duration: string;
    bestRouteName: string;
  }
  
  export interface ScheduledTask {
    departureTime: Date;
    arrivalTime: Date;
    address: string;
    distance: string;
    duration: string;
  }