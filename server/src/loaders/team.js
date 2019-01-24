export const batchTeams = async (keys, models) => {
  const teams = await models.Team.findAll({
    where: {
      id: {
        $in: keys,
      },
    },
  });

  return keys.map(key => teams.find(team => team.id === key));
};