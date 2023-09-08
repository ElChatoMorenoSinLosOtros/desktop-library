const jwtConstants = {
  secret: process.env.JWT_SECRET || 'secretKey'
};

const roundsOfHashing = 10;

export default { jwtConstants, roundsOfHashing };
