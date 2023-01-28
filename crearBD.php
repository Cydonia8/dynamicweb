<?php
    require_once "config.php";

    $conexion = new mysqli($host, $user, $pass);

    $eliminarbd = $conexion->prepare("drop database if exists $dbname");
    $eliminarbd->execute();
    $eliminarbd->close();

    $crearbd = $conexion->prepare("create database if not exists $dbname");
    $crearbd->execute();
    echo "--Base de datos $dbname creada--<br>";
    $crearbd->close();

    $conexion->select_db($dbname);

    $creartabla = $conexion->prepare("CREATE TABLE IF NOT EXISTS $tablename(
                                    id VARCHAR(20),
                                    name VARCHAR(50),
                                    date DATE,
                                    price DECIMAL(6,2),
                                    image VARCHAR(100),
                                    category VARCHAR(30),
                                    PRIMARY KEY(id));");

    $creartabla->execute();
    echo "---Tabla creada---<br>";
    $creartabla->close();

    $insercion = $conexion->prepare("INSERT INTO $tablename (category, name, price, image, date, id) VALUES
	('Signature Guitars', 'Music Man JP15 FM SB John Petrucci', 4440, 'https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/364295/10233915_800.jpg', '2015/08/01', 'gs147298'),
	('Signature Guitars', 'Music Man John Petrucci Majesty 6 BDS', 4555, 'https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/544910/17496669_800.jpg', '2019/04/01', 'gs137594'),
	('Signature Guitars', 'Music Man John Petrucci Majesty 7 SM', 7222, 'https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/544923/17374251_800.jpg', '2017/05/01', 'gs284795'),
	('Pickups', 'DiMarzio Illuminator DP257 F-Spaced BK', 116.89, 'https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/354050/11522564_800.jpg', '2016/03/12', 'pu177638'),
	('Pickups', 'Seymour Duncan P-90 Set Nickel', 276.99, 'https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/377296/11000246_800.jpg', '2015/12/07', 'pu199283'),
	('Electric Basses', 'Rickenbacker 4003 FG', 2353, 'https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/103893/6268299_800.jpg', '2013/07/04', 'eb233980'),
	('Electric Basses', 'Hofner H500/1 Artist Violin Bass', 1755, 'https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/488815/15686745_800.jpg', '2020/09/01', 'eb118794'),
	('Electric Basses', 'Fender Geddy Lee Jazz Bass BK', 1269.5, 'https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/136171/12752832_800.jpg', '2000/09/02', 'eb298117'),
	('Signature Guitars', 'Fender Clapton Strat Signature OW', 2539, 'https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/154407/12658491_800.jpg', '2002/05/01', 'gs112345'),
	('Signature Guitars', 'Gibson Custom EDS 1275 CH', 6699, 'https://thumbs.static-thomann.de/thumb/thumb220x220/pics/prod/348464.webp', '2007/05/12', 'gs938175'),
	('Signature Guitars', 'Gibson Les Paul Standard 50s', 2390, 'https://thumbs.static-thomann.de/thumb/thumb220x220/pics/prod/462505.webp', '2008/08/12', 'gs198765'),
	('Guitar Amplifiers', 'VOX AC30 C2', 1099, 'https://thumbs.static-thomann.de/thumb/thumb220x220/pics/prod/180600.webp', '2005/07/21', 'am445389'),
	('Guitar Amplifiers', 'Marshall 1959 HW', 1969, 'https://thumbs.static-thomann.de/thumb/thumb220x220/pics/prod/177417.webp', '2010/03/20', 'am129983'),
	('Guitar Amplifiers', 'Fender Blues Deluxe Reissue', 1111, 'https://thumbs.static-thomann.de/thumb/thumb220x220/pics/prod/180643.webp', '2003/10/14', 'am276489'),
	('Guitar Amplifiers', 'Mesa Boogie Mark Five Head', 2777, 'https://thumbs.static-thomann.de/thumb/thumb220x220/pics/prod/224041.webp', '2009/11/19', 'am945287'),
	('Organs', 'Hammond XK-5', 3890, 'https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/394478/11596124_800.jpg', '2012/06/01', 'or148923'),
	('Organs', 'Hammond SKX Pro', 3666, 'https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/536652/17548100_800.jpg', '2010/09/05', 'or454289'),
	('Sheet Music', 'The Beatles Complete Scores', 92, 'https://thumbs.static-thomann.de/thumb/thumb220x220/pics/prod/384526.webp', '2001/04/20', 'ms198274'),
	('Sheet Music', 'Atlantic Music Charlie Parker Omnibook', 32, 'https://thumbs.static-thomann.de/thumb/thumb220x220/pics/prod/220679.webp', '2011/01/01', 'ms598254'),
	('Metronomes', 'Wittner Metronome 813M with Bell', 145, 'https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/133454/10308589_800.jpg', '2002/01/20', 'mn121789'),
	('Metronomes', 'Wittner Metronome 816K with Bell', 66.9, 'https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/160641/9563074_800.jpg', '2005/04/15', 'mn220984');");
    $insercion->execute();
    echo "--Datos insertados correctamente--";
    $insercion->close();
    $conexion->close();

?>