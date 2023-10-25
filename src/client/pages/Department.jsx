import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getDepartments from '@wasp/queries/getDepartments';
import createEmission from '@wasp/actions/createEmission';

export function Department() {
  const { departmentId } = useParams();
  const { data: departments, isLoading: departmentsLoading, error: departmentsError } = useQuery(getDepartments);
  const createEmissionFn = useAction(createEmission);
  const [source, setSource] = useState('');
  const [type, setType] = useState('');
  const [quantity, setQuantity] = useState('');

  if (departmentsLoading) return 'Loading...';
  if (departmentsError) return 'Error: ' + departmentsError;

  const department = departments.find((dept) => dept.id === Number(departmentId));

  if (!department) return 'Department not found.';

  const handleCreateEmission = () => {
    createEmissionFn({
      source,
      type,
      quantity,
      departmentId: department.id
    });
    setSource('');
    setType('');
    setQuantity('');
  };

  return (
    <div className='p-4'>
      <div className='mb-4'>
        <h2 className='text-2xl font-bold mb-2'>{department.name}</h2>
        <p className='text-gray-500'>User: {department.user.username}</p>
      </div>
      <div className='mb-4'>
        <h3 className='text-xl font-bold mb-2'>Emissions</h3>
        {department.emissions.map((emission) => (
          <div key={emission.id} className='bg-gray-100 p-4 mb-4 rounded-lg'>
            <div>Source: {emission.source}</div>
            <div>Type: {emission.type}</div>
            <div>Quantity: {emission.quantity}</div>
          </div>
        ))}
      </div>
      <div>
        <h3 className='text-xl font-bold mb-2'>New Emission</h3>
        <div className='flex gap-x-4'>
          <input
            type='text'
            placeholder='Source'
            className='px-1 py-2 border rounded'
            value={source}
            onChange={(e) => setSource(e.target.value)}
          />
          <input
            type='text'
            placeholder='Type'
            className='px-1 py-2 border rounded'
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
          <input
            type='text'
            placeholder='Quantity'
            className='px-1 py-2 border rounded'
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <button
            onClick={handleCreateEmission}
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          >
            Add Emission
          </button>
        </div>
      </div>
    </div>
  );
}