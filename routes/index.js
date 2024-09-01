var express = require('express');
var router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/recieve-icon-data', async (req, res) => {
  try {
    const coordinateSets = await prisma.coordinateSet.findMany({
          include : {
            icon : {
              select: {
                name: true
              }
            }}
        })

    // Transform the data
    const iconCoordinates = {};

    coordinateSets.forEach(coordSet => {
      const iconName = coordSet.icon.name;
      const { minX, maxX, minY, maxY } = coordSet;

      // Initialize icon data if not already present
      if (iconCoordinates[iconName]) {
        iconCoordinates[iconName].push({minX, maxX, minY, maxY});
      } else {
        iconCoordinates[iconName] = [{minX, maxX, minY, maxY}]
      }
    })

    res.json(iconCoordinates);
  } catch (error) {
    console.error('Error fetching icon data:', error);
    res.status(500).send('An error occurred while fetching icon data.');
  }
})

router.get('/current-high-scores', async (req, res) => {
  try {
    let currentHighScores = await prisma.highScores.findMany({
      orderBy: {
        time_total: 'asc'
      }
    });

    // Limit results to top 5 fastest
    currentHighScores = currentHighScores.length > 5 ? currentHighScores.slice(0,5) : currentHighScores;
    
    res.json(currentHighScores);
  } catch (error) {
    console.error('Error fetching high score data:', error);
    res.status(500).send('An error occurred while fetching high score data.');
  }
})

router.post('/update-high-scores', async (req, res) => {
  const {userName, time_total, time_mins, time_secs} = req.body;
  try {
    const newHighScore = await prisma.highScores.create({
      data: {
        userName,
        time_total,
        time_mins,
        time_secs
      }
    })
  
  res.status(201).json(newHighScore);

  } catch (err) {
    res.status(500).json({error: 'An error occurred while trying to create the High Score.'})
  }
})

module.exports = router;
