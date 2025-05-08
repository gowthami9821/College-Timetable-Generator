export interface CourseFormData {
  name: string;
  instructor: string;     
  lecturerName: string;   
  room: string;
  lectures: number;
  type: "theory" | "lab";
}

export interface Course extends CourseFormData {
  lectures: number;
}

export interface Slot {
  day: string;
  slot: string;
  instructor: string;     
  lecturerName: string;    
  room: string;
  type: "theory" | "lab";
}
