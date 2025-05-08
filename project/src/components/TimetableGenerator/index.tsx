import React, { useState } from "react";
import TimetableForm from "./TimetableForm";
import TimetableDisplay from "./TimetableDisplay";
import { CourseFormData, Course, Slot } from "@/types/timetable";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const theoryTimeSlots = [
  "9:00-9:50", "9:50-10:40", "10:40-11:30",
  "12:10-1:00", "1:00-1:50", "1:50-2:40", "2:40-3:30"
];
const labSlots = ["9:00-11:30", "12:10-3:30"];

export default function TimetableGenerator() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [courseForm, setCourseForm] = useState<CourseFormData>({
    name: "",
    instructor: "",
    lecturerName: "", 
    room: "",
    lectures: 1,
    type: "theory"
  });
  const [timetable, setTimetable] = useState<Record<string, Slot[]>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let processedValue: string | number = value;

    if (name === "lectures" && value) {
      processedValue = parseInt(value, 10);
      if (isNaN(processedValue) || processedValue < 1) processedValue = 1;
    }

    setCourseForm({ ...courseForm, [name]: processedValue });
  };

  const handleSelectChange = (name: string, value: string) => {
    setCourseForm({ ...courseForm, [name]: value });
  };

  const deleteCourse = (indexToDelete: number) => {
    console.log("Deleting course at index:", indexToDelete);
    const updatedCourses = courses.filter((_, index) => index !== indexToDelete);
    console.log("Updated courses:", updatedCourses);
    setCourses(updatedCourses);
  };

  const addCourse = () => {
    if (!courseForm.name || !courseForm.instructor || !courseForm.room || !courseForm.lecturerName) return;

    setCourses([...courses, {
      ...courseForm,
      lectures: parseInt(courseForm.lectures.toString(), 10)
    }]);

    setCourseForm({
      name: "",
      instructor: "",
      lecturerName: "", 
      room: "",
      lectures: 1,
      type: "theory"
    });
  };

  const generateTimetable = () => {
    const instructorSchedule: Record<string, string[]> = {};
    const roomSchedule: Record<string, boolean> = {};
    const generated: Record<string, Slot[]> = {};
    const allTheorySlots: { day: string; slot: string }[] = [];
    const allLabSlots: { day: string; slot: string }[] = [];

    days.forEach((day) => {
      theoryTimeSlots.forEach((slot) => {
        allTheorySlots.push({ day, slot });
      });
      labSlots.forEach((slot) => {
        allLabSlots.push({ day, slot });
      });
    });

    courses.forEach((course) => {
      let assigned = 0;
      generated[course.name] = [];

      const availableSlots = course.type === "lab"
        ? [...allLabSlots].sort(() => 0.5 - Math.random())
        : [...allTheorySlots].sort(() => 0.5 - Math.random());

      for (let i = 0; i < availableSlots.length && assigned < course.lectures; i++) {
        const { day, slot } = availableSlots[i];
        const key = `${day}-${slot}`;

        if ((instructorSchedule[course.instructor] || []).includes(key)) continue;
        if (roomSchedule[key]) continue;

        generated[course.name].push({
          day,
          slot,
          instructor: course.instructor,
          lecturerName: course.lecturerName,
          room: course.room,
          type: course.type
        });

        instructorSchedule[course.instructor] = [
          ...(instructorSchedule[course.instructor] || []),
          key,
        ];
        roomSchedule[key] = true;
        assigned++;
      }
    });

    setTimetable(generated);
  };

  return (
    <div className="container mx-auto p-4 md:p-6 max-w-6xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-purple-600 to-purple-600 tracking-wide drop-shadow-lg animate-pulse">
          SLOTIFY
        </h1>
        <h3 className="text-2xl font-bold">College Timetable Generator</h3>
        <p className="text-muted-foreground">
          Add your courses and generate a conflict-free timetable for your college schedule
        </p>
      </div>

      <TimetableForm
        courseForm={courseForm}
        handleInputChange={handleInputChange}
        handleSelectChange={handleSelectChange}
        addCourse={addCourse}
        generateTimetable={generateTimetable}
        courses={courses}
        deleteCourse={deleteCourse}
      />

      <TimetableDisplay timetable={timetable} />
    </div>
  );
}
