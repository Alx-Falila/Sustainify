import HttpError from '@wasp/core/HttpError.js'

export const getDepartments = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  return context.entities.Department.findMany({
    where: {
      userId: context.user.id
    }
  });
}

export const getEmissions = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  const emissions = await context.entities.Emission.findMany({
    where: {
      userId: context.user.id
    }
  });

  return emissions;
}