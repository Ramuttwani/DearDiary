const books = [{
    ISBN :"23467one",
    title :"getting started with MERN",
    authors:[1,2],
    language: "en" ,
    pubDate: "2021-16-09",
    numofPage:228,
    category: ["fiction","programming","tech"] ,
    publication: 1,
},
{
    ISBN :"23467two",
    title :"getting started with Python",
    authors:[1,2],
    language: "en" ,
    pubDate: "2021-16-09",
    numofPage:228,
    category: ["fiction","web dev","tech"] ,
    publication: 1,
},
];

const authors = [{
    id:1,
    name:"ram",
    books:["23467one","23467two"],
    },
    {id:2,
     name:"pavan",
     books:["23467one"],
},
];

const publications = [{
id:1,
name:"chakra",
books:"23467one",
},
];

module.exports = {books,authors,publications};
