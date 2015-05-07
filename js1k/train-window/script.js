//
// Code by Reinder Nijhoff for js1k
// 2015
// compressed using Regpack v3.0.2
//
// Twitter: @reindernijhoff
// Website: http://www.birdgames.nl
//

time = 0,

// linear interpolation of heightmap
layer = function(l) {
  return b[~~l] -l%1 * b[~~l] + l%1 * b[~~l+1]
},

setInterval(function(l) {
  // If animation loop completes (time != 0), start new interval
  if ( !time )

    /**
     * Color Loop
     *
     * Define/create random HSL colors, loop 7 times (index set to -1 as it will become 0 on init)
     */
    for (
      /**
       * Multiplier Large
       * Random number between [5.00000, 45.00000]
       */
      multiplerLarge = 5+(40 * Math.random()),
      
      /**
       * Multiplier Small
       * Random number between [0.060000, 0.60000]
       */
      multiplierSmall = .6 * Math.random(),

      /**
       * Random Color 1
       * Appears as background/sky
       * @test randomColor1 = "hsl(360, 100%, 55%)"
       */
      randomColor1 = "hsl(" + [200 + 80 * Math.random(), "100%", multiplerLarge + 20 * Math.random() + "%)"],
      
      // l = "hsl(160, 100%, 52%)",
      /**
       * Random Color Unused
       * @test randomColorUnused = "hsl(360, 100%, 55%)"
       * @note appears to be unused? origin var `l` defined elswhere
       */
      l = "hsl(" + [200 * Math.random(), "50%", multiplerLarge+20 * Math.random()+"%)"],

      // Increase the multplier
      multiplerLarge *= 4,

      /**
       * Random Color 3
       * Appears as clouds/shadows on terrain
       */
      randomColor2 = "hsl(" + [200 + 180 * Math.random(), "100%", multiplerLarge + 20 * Math.random() + "%)"],

      i = -1; 6 > i++; ) {

        // @DEBUG - Log colors
        if ( i==0) {
          console.log('randomColor1 ' + '%c        ', 'background-color: '+randomColor1);
          console.log('randomColor2 ' + '%c        ', 'background-color: '+randomColor2);
        }

        /**
         * Heightmap Loop
         * Create heightmap values for layer (1000 array values between [0,1.0000])
         *
         * @test reduce 1000 to 10 to see effect
         * @confusion b is the <body> at array index 0 and 1, local variable?
         * @guess it's taking advantage of existing dom object to store values
         */
        for (bIndex = 1000; bIndex--;) {
          b[bIndex] = Math.random()
        }

        
        /**
         * Loop - Setup, Clouds & Trees
         */
        for (

          /**
           * Layer Width - (horizontal speed)
           * Create the speed at which each terrain layer scrolls with the sky being still
           * and the front-most layer moving fastest to create depth of field
           *
           * @test (i * i / (6 ^ i ? 8 : 2) 
           *       >> 0, 0.125, 0.5, 1.125, 2, 3.125, 18
           * 
           */
          terrainWidth = a.width + 400 * (layer[i] = i * i / (6 ^ i ? 7 : 2)),

          /**
           * Tree Scale
           * Create the scale of the trees, incrementing down based on canvas height
           *
           *  @test 20 * (7 - i) / (o = a.height)
           *        >> 1.1666, 1, 0.83333333, 0.666666, 0.5, 0.33333, 0.1666
           *  
           */
          treeScale = 80 * (7 - i) / (o = a.height),

          /**
           * Multiplier Clouds
           * Used in generating randomness of clouds
           *
           * @test multiplierClouds = 0
           */
          multiplierClouds = Math.random(),

          /**
           * Clone the canvas node for the clouds, and set their scale (height/width)
           */
          Z = z = a.cloneNode(),
          z.height = z.width = 60,

          /**
           * Set the context for the clouds, and create their gradient
           */
          s = z.getContext("2d"),
          w = s.createLinearGradient(0, 0, 0, 120),
          w.addColorStop(0, randomColor2),
          w.addColorStop(1, randomColor1),
          s.fillStyle = !i&&w,

          
          f = 300; f--;)
            for (x = 30; f / 9 < x--;)
              s.fillRect(30 + x * Math.cos(f) * Math.cos(f * Math.sin(f)), 30 + x *  Math.sin(f), .9, .9);

        
        // @DEBUG - Clouds & Trees
        console.log(
          w
        )

        // stars
        for (
          a[i] = z = a.cloneNode(),
          s = z.getContext("2d"),
          s.fillStyle = w = s.createLinearGradient(0, 0, 0, o),
          w.addColorStop(0, randomColor1),
          w.addColorStop(1, randomColor2),
          s.fillRect(0, 0, terrainWidth, o),
          s.fillStyle = "#eee", f = 1e4; f--;)
            s.fillRect( terrainWidth *  Math.random(), o*Math.random(), Math.random(),  80>multiplerLarge && Math.random() );


        // clouds
        for (
          f = 1e4; f--;)
            s.globalAlpha = multiplierClouds * b[i] * (1 - f / 1e4),
            s.drawImage(Z, 30 * Math.random() * o / b[i] - 20 * o / 2, f / 1e4 * o / 2  - o / 20, o / 2 + Math.random() * o / 2 * (1 - f / 1e4), Math.random() * o / 2 * (1 - f / 1e4)  / 4);

        if (i) {
          // trees
          for (
            z.width = terrainWidth,
            I = o / 2 + i * o / 20,
            6 ^ i || (I = o),
            x = terrainWidth; 0 < (x -= .2 / treeScale );)
              W = o/80 * (layer(x / 50) + 5 * layer(x / 200) + 10 * layer(x / 400)),
              layer(x / 300) + multiplierClouds/2 < Math.random()
              && 6 ^ i
              && s.drawImage(Z, x - Math.random()   / treeScale, I -   W * b[i] - Math.random()  / treeScale*3 - 3/treeScale  , 6   / treeScale, 30   / treeScale);

          // snow
          for( f = multiplierSmall > .5 && 1e4; f--; ) {
            l = s.fillStyle = "#eee",
            s.fillRect( terrainWidth *  Math.random(), o*Math.random(), Math.random()/S, Math.random() );
          }

          // height map
          for (
          s.lineTo(terrainWidth, o),
            x = terrainWidth; 0 < (x -= 5);)
              W = o/80 * (layer(x / 50) + 5 * layer(x / 200) + 10 * layer(x / 400)),
              s.lineTo(x, I -   W * b[i] - Math.random()  / treeScale);

          s.lineTo(0, o),
          s.fill(),

          s.globalCompositeOperation = "source-atop",
          s.globalAlpha = multiplierSmall,
          s.fillStyle = l,
          s.fillRect(0, 0, terrainWidth, o),
          s.globalAlpha = (7-i)/9,
          s.fillStyle = w = s.createLinearGradient(0, 0, 0, o),
          w.addColorStop(0, randomColor1),
          w.addColorStop(1, randomColor2),
          s.fillRect(0, 0, terrainWidth, o)
        }
      }


  // draw layers
  for (i = -1; 6 > i++;)
    c.drawImage(a[i], -time * layer[i], 0),
    // reflections
    I = o / 2 - i * o / 20,
    multiplierSmall < .5 && b[i] > .8 && i%2 &&  (
      c.translate(0, o+I),
      c.scale(1, -1),
      c.drawImage(a, 0, 2*i * o / 20, a.width, I, 0, I, a.width, I),
      c.translate(0, o+I),
      c.scale(1, -1)
    );
    // tunnel
    c.fillRect( a.width*40-a.width*++time/10,0, a.width, o),
    time %= 400
}, 16)