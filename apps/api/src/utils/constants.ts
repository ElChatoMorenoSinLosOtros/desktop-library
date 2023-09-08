const jwtConstants = {
  secret: process.env.JWT_SECRET || 'secretKey'
};

const roundsOfHashing = 10;

export { jwtConstants, roundsOfHashing };
