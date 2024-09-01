const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const parakeet = await prisma.icon.findUnique({
        where: { name: 'parakeet' }
      });
    
      const knight = await prisma.icon.findUnique({
        where: { name: 'knight' }
      });

      const king = await prisma.icon.findUnique({
        where: { name: 'king' }
      })
    
      await prisma.coordinateSet.createMany({
        data: [
          { iconId: parakeet.id, minY: 4.33, maxY: 19.8, minX: 57.5, maxX: 70 },
          { iconId: parakeet.id, minY: 8.1, maxY: 35, minX: 70, maxX: 77.5},
          { iconId: parakeet.id, minY: 14.4, maxY: 26.9, minX: 77.5, maxX: 85 },
          { iconId: parakeet.id, minY: 19.8, maxY: 25, minX: 60, maxX: 69 },
          { iconId: parakeet.id, minY: 19.5, maxY: 34.15, minX: 67, maxX: 77 },
          { iconId: knight.id, minY: 40, maxY: 48, minX: 46, maxX: 55.2 },
          { iconId: knight.id, minY: 43.8, maxY: 48, minX: 50, maxX: 55.2 },
          { iconId: king.id, minY: 34, maxY: 58, minX: 34.5, maxX: 41.5 }
        ]
      });
}

main()
  .catch(e => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
