import {z} from 'zod'
export const signup = z.object({
  firstname: z.string().min(1,'الاسم الاول مطلوب'),
  lastname: z.string().min(1,'الاسم الاخير مطلوب'),
  email: z.string().email('من فضلك قم بادخال ايميل صحيح'),
  password: z.string().min(6,'كلمة المرور يجب ان لاتقل عن ستة خانات')
});

export type Register = z.infer<typeof signup>;


export interface Model{
    Showmodel : boolean
}

// export interface Location {
//     address: string;
//     deadline: string;
//     position: { lat: number | null; lng: number | null };
//     photoUrl?: string;
//   }
  
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


  export interface Location {
    address: string;
    position: { lat: number; lng: number };
  }
  
  export interface Task {
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
  
  export interface BusyTime {
    start: string;
    end: string;
  }

  export const loginval = z.object({
    email: z.string().email('الايمي غير صحيح'),
    password: z.string().min(6, 'كلمة يجب اتكون على الاقل سة خانات'),
  });

 export  type LoginvalType = z.infer<typeof loginval>;
