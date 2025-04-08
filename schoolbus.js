import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface StudentStatus {
  name: string;
  time: string;
}

export default function SchoolBusApp() {
  const [studentName, setStudentName] = useState("");
  const [pickedUpStudents, setPickedUpStudents] = useState<StudentStatus[]>([]);
  const [arrivedStudents, setArrivedStudents] = useState<StudentStatus[]>([]);
  const [isDriverLoggedIn, setIsDriverLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const getCurrentTime = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const handlePickupStudent = () => {
    if (studentName && !pickedUpStudents.some(s => s.name === studentName)) {
      setPickedUpStudents([...pickedUpStudents, { name: studentName, time: getCurrentTime() }]);
      setStudentName("");
    }
  };

  const handleArriveStudent = () => {
    if (
      studentName &&
      pickedUpStudents.some(s => s.name === studentName) &&
      !arrivedStudents.some(s => s.name === studentName)
    ) {
      setArrivedStudents([...arrivedStudents, { name: studentName, time: getCurrentTime() }]);
      setStudentName("");
    }
  };

  const handleLogin = () => {
    if (username === "driver" && password === "password") {
      setIsDriverLoggedIn(true);
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">School Bus Tracker</h1>

      <Tabs defaultValue="parents" className="w-full">
        <TabsList className="grid w-full grid-cols-1">
          <TabsTrigger value="parents">Parents</TabsTrigger>
          {isDriverLoggedIn && <TabsTrigger value="driver">Driver</TabsTrigger>}
        </TabsList>
        <TabsContent value="parents">
          <Card className="mt-4">
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold mb-2">Picked Up</h2>
              {pickedUpStudents.length > 0 ? (
                <ul className="list-disc list-inside">
                  {pickedUpStudents.map((student, index) => (
                    <li key={index}>{student.name} <span className="text-sm text-gray-500">({student.time})</span></li>
                  ))}
                </ul>
              ) : (
                <p>No students have been picked up yet.</p>
              )}
              <h2 className="text-xl font-semibold mb-2 mt-4">Arrived at School</h2>
              {arrivedStudents.length > 0 ? (
                <ul className="list-disc list-inside">
                  {arrivedStudents.map((student, index) => (
                    <li key={index}>{student.name} <span className="text-sm text-gray-500">({student.time})</span></li>
                  ))}
                </ul>
              ) : (
                <p>No students have arrived yet.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="driver">
          {!isDriverLoggedIn ? (
            <Card className="mt-4">
              <CardContent className="p-4">
                <h2 className="text-xl font-semibold mb-2">Driver Login</h2>
                <div className="flex flex-col gap-2">
                  <Input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                  />
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                  />
                  <Button onClick={handleLogin}>Login</Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="mt-4">
              <CardContent className="p-4">
                <h2 className="text-xl font-semibold mb-2">Update Student Status</h2>
                <div className="flex gap-2 mb-4">
                  <Input
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="Enter student name"
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={handlePickupStudent}>Mark as Picked Up</Button>
                  <Button onClick={handleArriveStudent}>Mark as Arrived</Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
