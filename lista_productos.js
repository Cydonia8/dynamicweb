"use strict"

const productos = [
    {
        id: 'gs147298',
        name: 'Music Man JP15 FM SB John Petrucci',
        date: '2015/08/01',
        price: 4440,
        image: 'https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/364295/10233915_800.jpg',
        category: 'Signature Guitars'
    },
    {
        id: 'gs137594',
        name: 'Music Man John Petrucci Majesty 6 BDS',
        date: '2019/04/01',
        price: 4555,
        image: 'https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/544910/17496669_800.jpg',
        category: 'Signature Guitars'
    },
    {
        id: 'gs284795',
        name: 'Music Man John Petrucci Majesty 7 SM',
        date: '2017/05/01',
        price: 7222,
        image: 'https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/544923/17374251_800.jpg',
        category: 'Signature Guitars'
    },
    {
        id: 'pu177638',
        name: 'DiMarzio Illuminator DP257 F-Spaced BK',
        date: '2016/03/12',
        price: 116.89,
        image: 'https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/354050/11522564_800.jpg',
        category: 'Pickups'
    },
    {
        id: 'pu199283',
        name: 'Seymour Duncan P-90 Set Nickel',
        date: '2015/12/07',
        price: 276.99,
        image: 'https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/377296/11000246_800.jpg',
        category: 'Pickups'
    },
    {
        id: 'eb233980',
        name: 'Rickenbacker 4003 FG',
        date: '2013/07/04',
        price: 2353,
        image: 'https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/103893/6268299_800.jpg',
        category: 'Electric Basses'
    },
    {
        id: 'eb118794',
        name: 'Höfner H500/1 Artist Violin Bass',
        date: '2020/09/01',
        price: 1755,
        image: 'https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/488815/15686745_800.jpg',
        category: 'Electric Basses'
    },
    {
        id: 'eb298117',
        name: 'Fender Geddy Lee Jazz Bass BK',
        date: '2000/09/02',
        price: 1269.50,
        image: 'https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/136171/12752832_800.jpg',
        category: 'Electric Basses'
    },
    {
        id: 'gs112345',
        name: 'Fender Clapton Strat Signature OW',
        date: '2002/05/01',
        price: 2539,
        image: 'https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/154407/12658491_800.jpg',
        category: 'Signature Guitars'
    },
    {
        id: 'gs938175',
        name: 'Gibson Custom EDS 1275 CH',
        date: '2007/05/12',
        price: 6699,
        image: 'https://thumbs.static-thomann.de/thumb/thumb220x220/pics/prod/348464.webp',
        category: 'Signature Guitars'
    },
    {
        id: 'gs198765',
        name: 'Gibson Les Paul Standard 50s',
        date: '2008/08/12',
        price: 2390,
        image: 'https://thumbs.static-thomann.de/thumb/thumb220x220/pics/prod/462505.webp',
        category: 'Signature Guitars'
    },
    {
        id: 'am445389',
        name: 'VOX AC30 C2',
        date: '2005/07/21',
        price: 1099,
        image: 'https://thumbs.static-thomann.de/thumb/thumb220x220/pics/prod/180600.webp',
        category: 'Guitar Amplifiers'
    },
    {
        id: 'am129983',
        name: 'Marshall 1959 HW',
        date: '2010/03/20',
        price: 1969,
        image: 'https://thumbs.static-thomann.de/thumb/thumb220x220/pics/prod/177417.webp',
        category: 'Guitar Amplifiers'
    },
    {
        id: 'am276489',
        name: 'Fender Blues Deluxe Reissue',
        date: '2003/10/14',
        price: 1111,
        image: 'https://thumbs.static-thomann.de/thumb/thumb220x220/pics/prod/180643.webp',
        category: 'Guitar Amplifiers'
    },
    {
        id: 'am945287',
        name: 'Mesa Boogie Mark Five Head',
        date: '2009/11/19',
        price: 2777,
        image: 'https://thumbs.static-thomann.de/thumb/thumb220x220/pics/prod/224041.webp',
        category: 'Guitar Amplifiers'
    },
    {
        id: 'or148923',
        name: 'Hammond XK-5',
        date: '2012/06/01',
        price: 3890,
        image: 'https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/394478/11596124_800.jpg',
        category: 'Organs'
    },
    {
        id: 'or454289',
        name: 'Hammond SKX Pro',
        date: '2010/09/05',
        price: 3666,
        image: 'https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/536652/17548100_800.jpg',
        category: 'Organs'
    },
    {
        id: 'ms198274',
        name: 'The Beatles Complete Scores',
        date: '2001/04/20',
        price: 92,
        image: 'https://thumbs.static-thomann.de/thumb/thumb220x220/pics/prod/384526.webp',
        category: 'Sheet Music'
    },
    {
        id: 'ms598254',
        name: 'Atlantic Music Charlie Parker Omnibook',
        date: '2011/01/01',
        price: 32,
        image: 'https://thumbs.static-thomann.de/thumb/thumb220x220/pics/prod/220679.webp',
        category: 'Sheet Music'
    },
    {
        id: 'mn121789',
        name: 'Wittner Metronome 813M with Bell',
        date: '2002/01/20',
        price: 145,
        image: 'https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/133454/10308589_800.jpg',
        category: 'Metronomes'
    },
    {
        id: 'mn220984',
        name: 'Wittner Metronome 816K with Bell',
        date: '2005/04/15',
        price: 66.90,
        image: 'https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/160641/9563074_800.jpg',
        category: 'Metronomes'
    }

]
