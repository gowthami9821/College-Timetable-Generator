import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CourseFormData, Course } from "@/types/timetable";

interface TimetableFormProps {
  courseForm: CourseFormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  addCourse: () => void;
  generateTimetable: () => void;
  courses: Course[];
  deleteCourse: (index: number) => void;
}

export default function TimetableForm({
  courseForm,
  handleInputChange,
  handleSelectChange,
  addCourse,
  generateTimetable,
  courses,
  deleteCourse,
}: TimetableFormProps) {
  return (
    <div className="space-y-6 px-4 max-w-3xl mx-auto mt-10">
      {/* Main Form Card */}
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 shadow-lg shadow-purple-500 hover:shadow-yellow-500 transition">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="space-y-2">
            <Label htmlFor="name">Course Name</Label>
            <Input
              id="name"
              name="name"
              value={courseForm.name}
              onChange={handleInputChange}
              placeholder="e.g. Mathematics 101"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="instructor">Instructor ID</Label>
            <Input
              id="instructor"
              name="instructor"
              value={courseForm.instructor}
              onChange={handleInputChange}
              placeholder="e.g. PROF001"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="lecturerName">Lecturer Name</Label>
            <Input
              id="lecturerName"
              name="lecturerName"
              value={courseForm.lecturerName}
              onChange={handleInputChange}
              placeholder="e.g. Dr. Smith"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="room">Room Number</Label>
            <Input
              id="room"
              name="room"
              value={courseForm.room}
              onChange={handleInputChange}
              placeholder="e.g. A101"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="lectures">Lectures/Week</Label>
            <Input
              id="lectures"
              type="number"
              name="lectures"
              min="1"
              max="10"
              value={courseForm.lectures}
              onChange={handleInputChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Class Type</Label>
            <Select
              value={courseForm.type}
              onValueChange={(value) => handleSelectChange("type", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select class type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="theory">Theory (50 mins)</SelectItem>
                <SelectItem value="lab">Lab (2:30 hrs)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-4">
          <Button
            onClick={addCourse}
            disabled={
              !courseForm.name ||
              !courseForm.instructor ||
              !courseForm.lecturerName ||
              !courseForm.room
            }
          >
            Add Course
          </Button>

          <Button
            onClick={generateTimetable}
            variant="secondary"
            disabled={courses.length === 0}
          >
            Generate Timetable
          </Button>
        </div>
      </div>

      {/* Course List Card */}
      {courses.length > 0 && (
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 shadow-lg shadow-yellow-500/20 hover:shadow-yellow-500 transition">
          <h2 className="text-lg font-semibold mb-2">Courses Added:</h2>
          <ul className="space-y-2">
            {courses.map((course, idx) => (
              <li
                key={idx}
                className="flex items-center justify-between gap-2 p-2 rounded-md bg-muted/50"
              >
                <div>
                  <span className="font-medium">{course.name}</span>
                  <span className="text-sm text-muted-foreground ml-2">
                    ({course.type === "theory" ? "Theory" : "Lab"}) by{" "}
                    {course.lecturerName} [{course.instructor}] in {course.room} (
                    {course.lectures}{" "}
                    {course.lectures === 1 ? "time" : "times"}/week)
                  </span>
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => deleteCourse(idx)}
                >
                  Delete
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
