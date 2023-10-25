import HttpError from '@wasp/core/HttpError.js'

export const createDepartment = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const department = await context.entities.Department.create({
    data: {
      name: args.name,
      user: { connect: { id: context.user.id } }
    }
  });

  return department;
}

export const createEmission = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const { source, type, quantity, departmentId } = args;

  const department = await context.entities.Department.findUnique({
    where: { id: departmentId }
  });

  if (!department) { throw new HttpError(404, `Department with id ${departmentId} not found.`) };

  if (department.userId !== context.user.id) { throw new HttpError(403) };

  return context.entities.Emission.create({
    data: {
      source,
      type,
      quantity,
      department: { connect: { id: departmentId } },
      user: { connect: { id: context.user.id } }
    }
  });
}