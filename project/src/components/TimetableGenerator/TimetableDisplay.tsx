import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slot } from "@/types/timetable";

interface TimetableDisplayProps {
  timetable: Record<string, Slot[]>;
}

export default function TimetableDisplay({ timetable }: TimetableDisplayProps) {
  if (Object.keys(timetable).length === 0) {
    return null;
  }

  // Define gradient color sets
  const gradients = [
    "from-blue-100 to-purple-100",
    "from-green-100 to-emerald-200",
    "from-yellow-100 to-orange-200",
    "from-pink-100 to-red-200",
    "from-indigo-100 to-purple-200",
    "from-sky-100 to-cyan-200",
  ];

  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-4">Generated Timetable</h2>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {Object.entries(timetable).map(([course, slots], index) => {
          const gradient = gradients[index % gradients.length];

          return (
            <Card
              key={course}
              className={`overflow-hidden border-t-4 border-t-primary transition-all hover:shadow-lg bg-gradient-to-br ${gradient}`}
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{course}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {slots.map((slot, idx) => (
                  <div key={idx} className="flex flex-col p-2 rounded-md bg-muted/30">
                    <div className="flex items-center justify-between">
                      <strong className="font-medium">{slot.day}</strong>
                      <Badge variant={slot.type === "theory" ? "outline" : "secondary"}>
                        {slot.type === "theory" ? "Theory" : "Lab"}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">{slot.slot}</div>
                    <div className="text-sm mt-1">
                      {slot.instructor} • Room {slot.room}
                    </div>
                  </div>
                ))}
                {slots.length === 0 && (
                  <div className="text-muted-foreground text-sm italic">
                    Could not schedule this course. Please try again or adjust parameters.
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

