import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getDepartments from '@wasp/queries/getDepartments';
import getEmissions from '@wasp/queries/getEmissions';

export function Dashboard() {
  const { data: departments, isLoading: departmentsLoading, error: departmentsError } = useQuery(getDepartments);
  const { data: emissions, isLoading: emissionsLoading, error: emissionsError } = useQuery(getEmissions);

  if (departmentsLoading || emissionsLoading) return 'Loading...';
  if (departmentsError || emissionsError) return 'Error: ' + (departmentsError || emissionsError);

  return (
    <div>
      <h1 className="text-4xl font-bold mb-4">Dashboard</h1>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-white rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Departments</h2>

          {departments.map((department) => (
            <div key={department.id} className="bg-gray-100 p-4 mb-4 rounded-lg">
              <h3 className="text-xl font-bold mb-2">{department.name}</h3>
              <p>Total Emissions: {department.emissions.reduce((acc, emission) => acc + emission.quantity, 0)}</p>
            </div>
          ))}
        </div>

        <div className="p-4 bg-white rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Emissions</h2>

          {emissions.map((emission) => (
            <div key={emission.id} className="bg-gray-100 p-4 mb-4 rounded-lg">
              <p>Source: {emission.source}</p>
              <p>Type: {emission.type}</p>
              <p>Quantity: {emission.quantity}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}