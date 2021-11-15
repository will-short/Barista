"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Drinks", [
      {
        name: "Coffee",
        description:
          "Coffee is as simple as it gets with ground coffee beans steeped in hot water, served warm.",
        ingredients: "Coffee",
        image:
          "https://res.cloudinary.com/dc9htgupc/image/upload/v1636405352/drink%20images/cdzak4f4llomf4mdjlqi.jpg",
      },
      {
        name: "Latte",
        description:
          "As the most popular coffee drink out there, the latte is comprised of a shot of espresso and steamed milk with just a touch of foam. It can be ordered plain or with a flavor shot of anything from vanilla to pumpkin spice.",
        ingredients: "Espresso, Steamed Milk",
        image:
          "https://res.cloudinary.com/dc9htgupc/image/upload/v1636405200/drink%20images/wzhslp6btqje7dhlye4g.jpg",
      },
      {
        name: "Cappuccino",
        description:
          "Cappuccino is a latte made with more foam than steamed milk, often with a sprinkle of cocoa powder or cinnamon on top. Sometimes you can find variations that use cream instead of milk or ones that throw in flavor shot, as well.",
        ingredients: "Espresso, Steamed Milk, Foam",
        image:
          "https://res.cloudinary.com/dc9htgupc/image/upload/v1636405419/drink%20images/jap9cxzvuw5uofmrshbt.jpg",
      },
      {
        name: "Americano",
        description:
          "With a similar flavor to black coffee, the americano consists of an espresso shot diluted in hot water.",
        ingredients: "Espresso, Hot Water",
        image:
          "https://res.cloudinary.com/dc9htgupc/image/upload/v1636405492/drink%20images/xskr0vcs9p0b1ueflojd.jpg",
      },
      {
        name: "Espresso",
        description:
          "An espresso shot can be served solo or used as the foundation of most coffee drinks, like lattes and macchiatos.",
        ingredients: "1oz Espresso",
        image:
          "https://res.cloudinary.com/dc9htgupc/image/upload/v1636405542/drink%20images/yrr4rqjh3eunrfnhbs3r.jpg",
      },
      {
        name: "Doppio",
        description:
          "A double shot of espresso, the doppio is perfect for putting extra pep in your step.",
        ingredients: "2oz Espresso",
        image:
          "https://res.cloudinary.com/dc9htgupc/image/upload/v1636405563/drink%20images/cozreg9pmdvttpfyuhfw.jpg",
      },
      {
        name: "Cortado",
        description:
          "Like yin and yang, a cortado is the perfect balance of espresso and warm steamed milk. The milk is used to cut back on the espresso’s acidity.",
        ingredients: "1oz Espresso, 1oz Steamed Milk",
        image:
          "https://res.cloudinary.com/dc9htgupc/image/upload/v1636405595/drink%20images/lg4maozf9hsxk5osfuo3.jpg",
      },
      {
        name: "Red Eye",
        description:
          "Named after those pesky midnight flights, a red eye can cure any tiresome morning. A full cup of hot coffee with an espresso shot mixed in, this will definitely get your heart racing.",
        ingredients: "Coffee, Espresso",
        image:
          "https://res.cloudinary.com/dc9htgupc/image/upload/v1636405625/drink%20images/meueoodhzqiv3kbnvzno.jpg",
      },
      {
        name: "Galão",
        description:
          "Originating in Portugal, this hot coffee drink is closely related to the latte and cappuccino. Only difference is it contains about twice as much foamed milk, making it a lighter drink compared to the other two.",
        ingredients: "Espresso, Foamed milk",
        image:
          "https://res.cloudinary.com/dc9htgupc/image/upload/v1636405666/drink%20images/yx8d4jkjfoeaqpdbhakn.jpg",
      },
      {
        name: "Lungo",
        description:
          "A lungo is a long-pull espresso. The longer the pull, the more caffeine there is and the more ounces you can enjoy.",
        ingredients: "Long pulled espresso",
        image:
          "https://res.cloudinary.com/dc9htgupc/image/upload/v1636405808/drink%20images/jb8gbiveqfae8eydulob.jpg",
      },
      {
        name: "Macchiato",
        description:
          "The macchiato is another espresso-based drink that has a small amount of foam on top. It’s the happy medium between a cappuccino and a doppio.",
        ingredients: "Espresso, Foam",
        image:
          "https://res.cloudinary.com/dc9htgupc/image/upload/v1636405859/drink%20images/qcplazescpwszuq0yegj.jpg",
      },
      {
        name: "Mocha",
        description:
          "For all you chocolate lovers out there, you’ll fall in love with a mocha (or maybe you already have). The mocha is a chocolate espresso drink with steamed milk and foam.",
        ingredients: "Espresso, Steamed Milk, Chocolate",
        image:
          "https://res.cloudinary.com/dc9htgupc/image/upload/v1636405883/drink%20images/oildrcwz3r7fxqyigfsg.jpg",
      },
      {
        name: "Ristretto",
        description:
          "Ristretto is an espresso shot. It uses less hot water which creates a sweeter flavor compared to the bitter taste of a traditional shot of espresso or a doppio.",
        ingredients: "Short pulled espresso",
        image:
          "https://res.cloudinary.com/dc9htgupc/image/upload/v1636405943/drink%20images/stk7nsepyxpctfcbyq88.jpg",
      },
      {
        name: "Flat White",
        description:
          "This Aussie-born drink is basically a cappuccino without the foam or chocolate sprinkle. It’s an espresso drink with steamed milk.",
        ingredients: "Espresso, Steamed Milk",
        image:
          "https://res.cloudinary.com/dc9htgupc/image/upload/v1636405976/drink%20images/jauot7becqqvqoqsfrif.webp",
      },
      {
        name: "Affogato",
        description:
          "The affogato is an excuse to enjoy a scoop of ice cream any time of day (and any time of year in my opinion). Served with a scoop of ice cream and a shot of espresso, or two.",
        ingredients: "Espresso, Ice cream",
        image:
          "https://res.cloudinary.com/dc9htgupc/image/upload/v1636406001/drink%20images/jwvjju71u36nhlsc1jci.jpg",
      },
      {
        name: "Café au Lait",
        description:
          "Café au lait is perfect for the coffee minimalist who wants a bit more flavor. Just add a splash of warm milk to your coffee and you’re all set!",
        ingredients: "Coffee, Steamed Milk",
        image:
          "https://res.cloudinary.com/dc9htgupc/image/upload/v1636406027/drink%20images/k6ej3cj564odof7qgokk.jpg",
      },
      {
        name: "Irish",
        description:
          "Irish coffee consists of black coffee, whiskey and sugar, topped with whipped cream.",
        ingredients: "Coffee, Whiskey, Sugar, Cream",
        image:
          "https://res.cloudinary.com/dc9htgupc/image/upload/v1636406046/drink%20images/husnnojdyzy2ztxv5xk7.jpg",
      },
      {
        name: "Guayoyo",
        description:
          "Traditional venezuelan coffee prepared by filtering the ground coffee in a cone of cloth and pouring hot water on top of it. It's prefferably drinked wihout milk nor cream.",
        ingredients: "Coffee, Traditional, Hot Water",
        image:
          "https://res.cloudinary.com/dc9htgupc/image/upload/v1636406119/drink%20images/ah6iaomwfxskcq8dddlp.jpg",
      },
      {
        name: "Cortadito",
        description:
          "Traditional cuban coffee method where a bit of freshly brewed coffee is mixed with sugar to create a highly sugared paste. Then add the rest of the coffee and stir adding milk until a 50/50 ratio is achieved.",
        ingredients: "Coffee, Traditional, Sugar, Milk",
        image:
          "https://res.cloudinary.com/dc9htgupc/image/upload/v1636406144/drink%20images/geoaz9o7vsnpa3dwlh58.jpg",
      },
      {
        name: "Aguapanela Coffee",
        description:
          "Bring panela and coffee to a boil in a small pan for 30 minutes until panela is melted. Brew your coffee using your favorite brewing technique but add the hot aguapanela instead of hot water. Delicious sweetened coffee is ready.",
        ingredients: "Coffee, Sweet, Panela, Traditional",
        image:
          "https://res.cloudinary.com/dc9htgupc/image/upload/v1636406164/drink%20images/wrvyvfjs3nsc4bdl22ep.jpg",
      },
      {
        name: "Iced Coffee",
        description:
          "A coffee with ice, typically served with a dash of milk, cream or sweetener—iced coffee is really as simple as that.",
        ingredients: "Coffee, Ice, Sugar, Cream",
        image:
          "https://res.cloudinary.com/dc9htgupc/image/upload/v1636406197/drink%20images/oupeecalyyj2sbfxjnpz.jpg",
      },
      {
        name: "Iced Espresso",
        description:
          "Like an iced coffee, iced espresso can be served straight or with a dash of milk, cream or sweetener. You can also ice speciality espresso-based drinks like americanos, mochas, macchiatos, lattes and flat whites.",
        ingredients: "Espresso, Ice, Sugar, Cream",
        image:
          "https://res.cloudinary.com/dc9htgupc/image/upload/v1636406223/drink%20images/tpsjyjh9teijazw0fcu6.jpg",
      },
      {
        name: "Cold Brew",
        description:
          "The trendiest of the iced coffee bunch, cold brew coffees are made by steeping coffee beans from anywhere between 6-36 hours, depending on how strong you would like your cold brew. Once the beans are done steeping, add cold milk or cream.",
        ingredients: "Long steeped coffee, Ice",
        image:
          "https://res.cloudinary.com/dc9htgupc/image/upload/v1636406264/drink%20images/ym4jtdodftjolacetmhx.jpg",
      },
      {
        name: "Frappuccino",
        description:
          "Made famous by Starbucks, the Frappuccino is a blended iced coffee drink that’s topped with whipped cream and syrup. ",
        ingredients: "Espresso, Blended ice, Whip",
        image:
          "https://res.cloudinary.com/dc9htgupc/image/upload/v1636406291/drink%20images/tt7jhc0s2nupgj10uk5h.jpg",
      },
      {
        name: "Nitro",
        description:
          "A cold brew + nitrogen bubbles = a cold brew coffee with a frothy, Guinness-like consistency. (It’s poured via a nitro tap, too.)",
        ingredients: "Coffee, Nitrogen bubbles, Sugar, Cream",
        image:
          "https://res.cloudinary.com/dc9htgupc/image/upload/v1636406350/drink%20images/rrkitxqj1bt1d1qwbwbn.jpg",
      },
      {
        name: "Mazagran",
        description:
          "Mazagran coffee is a cross between iced coffee, tea and your favorite rum drink. It typically consists of espresso, lemon, sugar and (sometimes) rum.",
        ingredients: "Coffee, Sugar, Lemon, Rum",
        image:
          "https://res.cloudinary.com/dc9htgupc/image/upload/v1636406953/drink%20images/mnaoi2xe7zjvgwsgxx8q.jpg",
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Drinks", null, {});
  },
};
