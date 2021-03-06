<?php
    mb_internal_encoding("UTF-8");
    $hlaska = '';
    if (isset($_GET['uspech']))
        $hlaska = 'Email byl úspěšně odeslán, brzy vám odpovíme. / Email was successfully sent. We will reply you as soon as possible.';
    if ($_POST) // V poli _POST něco je, odeslal se formulář
    {
        if (isset($_POST['name']) && $_POST['name'] &&
            isset($_POST['email']) && $_POST['email'] &&
            isset($_POST['subject']) && $_POST['subject'] &&
            isset($_POST['msg']) && $_POST['msg'] &&
            isset($_POST['year']) && $_POST['year'] == date('Y'))
        {
            $hlavicka = 'From:' . $_POST['email'];
            $hlavicka .= "\nMIME-Version: 1.0\n";
            $hlavicka .= "Content-Type: text/html; charset=\"utf-8\"\n";
            $adresa = 'wineandart@centrum.cz';
            $contentMsg = 'Odesílatel: '.$_POST['name'].".\n"."Zpráva: ".$_POST['msg'];
            $contentMsg = '<ul style="list-style: none;"><li style="margin-bottom:20px;"><strong>Odesílatel: '.'</strong>'.$_POST['name'].'</li>';
            $contentMsg .= '<li style="margin-bottom:20px";><strong>Předmět: '.'</strong>'.$_POST['subject'].'</li>';
            $contentMsg .= '<li style="margin-bottom:20px";><strong>Datum a čas odeslání zprávy: '.'</strong>'.date("d.m.Y").', '.date("H:i:s").'</li>';
            $contentMsg .= '<li style="margin-bottom:40px";><strong>Email: '.'</strong>'.$_POST['email'].'</li>';
            $contentMsg .= '<li><strong>Zpráva: '.'</strong>'.$_POST['msg'].'</li></ul>';
            $predmet = 'Nová zpráva z kontaktního formuláře WA';
            $uspech = mb_send_mail($adresa, $predmet, $contentMsg, $hlavicka);
            if ($uspech)
            {
                $hlaska = 'Email byl úspěšně odeslán, brzy vám odpovíme. / Email was successfully sent. We will reply you as soon as possible.';
                header('Location: index.php?uspech=ano#contactFormQt');
                exit;
            }
            else
                $hlaska = 'Email se nepodařilo odeslat. Zkontrolujte adresu.';
        }
        else 
            $hlaska = 'Formulář není správně vyplněný!';
    }
?>

<!Doctype <!DOCTYPE html>
<html>

<head>
	<meta charset="utf-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title>WA Wine & Art - Milevsko</title>
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
	<meta name="author" content="Jan Soldát">
	<meta lang="cs">
	<meta name="description"
		content="Prodej exkluzivních vín z malých rodinných podniků nacházejících se v České republice, Francii či Rakousku. Naše motto zní, že život je příliš krátký na to, abychom pili nekvalitní víno.">
	<meta name="keywords"
		content="wine,víno,šampaňské,champagne,France,Moravia,Francie,Morava,Austria,Rakousko,art,umění,sklenice,láhev,exkluzivní,luxusní, Pinot, Chevauchet, chardonnay, meunier, pinot noir, Empreinte de Terroir, rosé, brut extra, Anthime, Sensation, Héritage, Rosé de saignée, Collet, domaine">
	<link rel="shortcut icon" href="img/favicon.ico" />
	<link rel="stylesheet" href="css/bootstrap.css">
	<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css"
		integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU" crossorigin="anonymous">
	<link rel="stylesheet" type="text/css" href="img/flaticon/font/flaticon.css">
	<link href="https://fonts.googleapis.com/css?family=Cinzel" rel="stylesheet">
	<link rel="stylesheet" media="screen" href="css/main.css" />
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/animate.css@3.5.2/animate.min.css">
	<link rel="stylesheet" href="https://unpkg.com/aos@next/dist/aos.css" />
	<link rel="stylesheet"
		href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.13.9/css/bootstrap-select.css" />
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.3.0/css/flag-icon.css" />
</head>





<body style="overflow-x:hidden;" id="page-top" data-spy="scroll" data-target="#navbar-main" data-offset="30">

	<!-- Navbar -->
	<nav class="navbar navbar-expand-lg navbar-light container-fluid fixed-top smooth-scroll" id="navbar-main">
		<a href="#" class="navbar-brand" id="navbar-brand-id"></a>
		<button id="navbarBTN" class="navbar-toggler custom-toggler ml-auto" type="button" data-toggle="collapse"
			data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="true"
			aria-label="Toggle navigation">
			<span class="container-navbar">
				<svg class="ham hamRotate ham4" viewBox="0 0 100 100" width="60">
					<path class="line top"
						d="m 70,33 h -40 c 0,0 -8.5,-0.149796 -8.5,8.5 0,8.649796 8.5,8.5 8.5,8.5 h 20 v -20" />
					<path class="line middle" d="m 70,50 h -40" />
					<path class="line bottom"
						d="m 30,67 h 40 c 0,0 8.5,0.149796 8.5,-8.5 0,-8.649796 -8.5,-8.5 -8.5,-8.5 h -20 v 20" />
				</svg>
			</span>
		</button>

		<div class="collapse navbar-collapse justify-content-center" id="navbarSupportedContent">
			<ul class="navbar-nav mr-4">
				<li class="nav-item">
					<a href="#about" class="nav-link underline-text lang" lang-key="about">O nás</a>
				</li>
				<li class="nav-item">
					<a href="#services" class="nav-link underline-text lang" lang-key="services">Služby</a>
				</li>
				<li class="nav-item">
					<a href="#offer" class="nav-link underline-text lang" lang-key="offer">Nabídka</a>
				</li>
				<li class="nav-item">
					<a href="#contact" class="nav-link underline-text lang" lang-key="contact">Kontakt</a>
				</li>
				<!-- <li class="nav-item">
					<a href="#timeline" class="nav-link underline-text">Timeline</a>
				</li> -->
			</ul>
		</div>

	</nav>

	<!-- Landing page image and logo -->
	<header class="masthead zoominheader">
		<div class="overlay">
			<div id="lg1" class="logo animated zoomIn">
				<div class="container h-100">
					<div class="row h-100"> </div>
				</div>
			</div>
			<div class="text-right m-2 translate-container mb-0">
				<i title='English version' alt='English version' class="translate"
					id="en">English version</i>
				<i title='Česká verze' alt='Česká verze' class="translate" id="cs">Česká verze</i>
			</div>
		</div>
	</header>

	<div class="container-fluid dark">
		<div id="about" class="container pt-4">

			<div class="row justify-content-center">
				<h1 class="display-4 m-0 pt-5 col-12 text-center lang" lang-key="about">O nás</h1>
				<p class="text-block col-12 aos-init aos-animated" data-aos-once="true" data-aos="fade-right"
					data-aos-duration="1000">
					<span class="lang" lang-key="about--text-one">
						Jak to všechno začalo? Kdy a jak nás champagne a skvělá čistá vína začala tak bavit? Úplně náhodu, jak už to tak v životě bývá. Dobrý kamarád nás oba dva pozval na výlet do Champagne. Zřejmě těžko by nás na našich cestách po Evropě a vysokých alpských kopcích napadlo zastavit cca 100 kilometrů od Paříže a věnovat se celý týden „bublinám“. Nicméně stalo se a od té doby nás to nepustilo. Časem se z nahodilého brouzdání okouzlujícími vesničkami Champagne stalo cílené objevování tohoto krásného vinařského regionu. Učarovalo nám nenapodobitelné snoubení champagne a francouzské gastronomie. </span><span class="text-highlighted lang" lang-key="about--text-two">Z náhodných setkání s mistry vinařského řemesla se staly cílené cesty za champagniery, z kterých se v průběhu let stali dobří známí a přátelé. </span>
					<span class="lang" lang-key="about--text-three">
						Když nám jednou zásoba jejich skvostných lahví ve sklepě došla, uvědomili jsme si, že ji není možno v České republice doplnit. A právě to byl ten okamžik, kdy jsme se rozhodli, že </span>
						<span class="lang text-highlighted " lang-key="about--text-fourth">chceme ty nejkrásnější bubliny světa, které jsme objevili, představit také vám.</span>
					</p>

					<p class="text-block col-12 aos-init aos-animated" data-aos-once="true" data-aos="fade-right"
					data-aos-duration="1000">
						<span class="lang" lang-key="about--text-fifth">
								Dnes jsme výhradními zástupci několika šampaňských domů pro ČR. Osobně se s námi můžete setkat na nejvýznamnějších přehlídkách skvělých champagne nebo na degustacích, které pořádáme v našem Gentleman´s clubu v Milevsku.
						</span>
						<span class="lang text-highlighted" lang-key="about--text-sixth">
								Stále však spolupracujeme výhradně s malými rodinnými vinařstvími, kde se tradice a poctivá práce několika generací odráží v kvalitě vína.
						</span>
						<span class="lang" lang-key="about--text-seven">
						Naší filosofií je dostat mezi vás - vinařské nadšence, ale i mezi ty, kteří s krásným a rozmanitým světem vína teprve začínají, taková vína, která vyjadřují osobitý charakter vinaře a terroir.
						</span>
					</p>
					<p class="text-block col-12 aos-init aos-animated" data-aos-once="true" data-aos="fade-right"
					data-aos-duration="1000">
						<span class="lang" lang-key="about--text-eight">
								Dobrá, nyní víte, kdo jsme. Co však nejsme? Nejsme radikální zastánci toho, že víno musí vypadat a chutnat právě tak, jak si to myslíme my. Jedno je ale jisté, chceme pít a nabízet vám taková vína, do kterých se nic zbytečného nepřidává. A je-li to shodou okolností bio víno, organické víno, naturální víno či víno s jakýmkoli jiným označením, budiž.
						</span>
					</p>

					<p class="text-block col-12 aos-init aos-animated" data-aos-once="true" data-aos="fade-right"
					data-aos-duration="1000">
						<span class="lang" lang-key="about--text-nine">
								Naše motto zní:  
						</span>
						<span class="lang text-highlighted" lang-key="about--text-ten">„Too much of anything is bad, but too much of champagne is just right…!“</span>
						<span class="lang" lang-key="about--text-eleven">A věděly to takové osobnosti jako Albert Einstein, Winston Churchill, Napoleon a výčet dalších je nekonečný. Historie jim dala za pravdu, že se nemýlily. Neváhejte ochutnat, nebudete litovat.</span>
					</p>
				</p>
				<div class="signature aos-init aos-animated" data-aos-once="true" data-aos="fade-up">
					<h3 style="text-align: center;font-family: 'Cinzel', serif;">MAREK a MICHAL
						<strong>KREJČÍ</strong>
					</h3>
				</div>
				<hr style="text-align: center; max-width: 875px; margin: auto;">
				<div class="logo-about aos-init aos-animated pb-5" data-aos-once="true" data-aos="zoom-in"
					data-aos-duration="1000">
					<img src="img/logos5.png" alt="Logo Wine & Art">
				</div>
			</div>
		</div>
	</div>

	<div class="container-fluid light">
		<div id="services" class="container pt-4">
			<div class="row justify-content-center">
				<h1 class="display-4 m-0 pt-5 col-12 text-center lang" lang-key="services">Služby</h1>
				<p class="text-block col-12 aos-init aos-animated" data-aos-once="true" data-aos="fade-right"
					data-aos-duration="1000">
					<span class="lang" lang-key="services--text-first">Nabízíme jedinečné služby ve světě vína – smyslem
						není pouze prodej vína, ale hlavně spokojenost zákazníků a jejich rostoucí zájem o víno. Díky
						tomu můžete ochutnat vína přímo </span>
					<span class="text-highlighted-light lang" lang-key="services--text-second">od vinařů, kteří jeho
						výrobě dávají 100% úsilí</span><span class="lang" lang-key="services--text-third">, a tím víno
						získává jedinečný charakter.</span>
					<br>
					<span class="text-highlighted-light lang" lang-key="services--text-fourth">Za kvalitou pečlivě
						uskladněných lahví si stojíme</span> <span class="lang" lang-key="services--text-fifth">a vše
						několikrát ročně ochutnáváme, takže se nemusíte bát nechat si od nás poradit.</span>
					<br>
					<span class="lang" lang-key="services--text-sixth">Možná právě vymýšlíte originální dar pro přátelé
						či vaše blízké? Proč ne právě vínko s nějakou delikatesou! Ideální narozeninový nebo svatební
						dar, který musí potěšit každého!</span>
				</p>
				<div class="col-12">
					<div class="row text-center">
						<div class="col-es-12 col-sm-6 col-lg-3 aos-init aos-animated" data-aos-once="true"
							data-aos="fade-down" data-aos-duration="1000">
							<i class="flaticon-wine-tasting"></i>
							<h4 class="lang" lang-key="services--deg-one">Degustace</h4>
							<p class="lang" lang-key="services--deg-two">Pravidelně pořádáme soukromé degustace s
								odborným výkladem. Všechny ochutnané láhve je také možné na místě přímo objednat.</p>
						</div>
						<div class="col-es-12 col-sm-6 col-lg-3 aos-init aos-animated" data-aos-once="true"
							data-aos="fade-down" data-aos-duration="1000">
							<i class="flaticon-grapes"></i>
							<h4 class="lang" lang-key="services--vis-one">Návštěva vinic</h4>
							<p class="lang" lang-key="services--vis-two">Na přání jsme Vám schopni zajistit návštěvu u
								vinaře. Ať již u našich partnerů na Moravě, tak v i v oblasti Champagne.</p>
						</div>
						<div class="col-es-12 col-sm-6 col-lg-3 aos-init aos-animated" data-aos-once="true"
							data-aos="fade-down" data-aos-duration="1000">
							<i class="flaticon-discuss-issue"></i>
							<h4 class="lang" lang-key="services--rec-one">Doporučení</h4>
							<p class="lang" lang-key="services--rec-two">Rádi poradíme ať již s výběrem té správné láhve
								nebo s výletem k vinaři, tak abyste si ho maximáloně užili a obohatili svoje znalosti.
							</p>
						</div>
						<div class="col-es-12 col-sm-6 col-lg-3 aos-init aos-animated" data-aos-once="true"
							data-aos="fade-down" data-aos-duration="1000">
							<i class="flaticon-shopping-cart"></i>
							<h4 class="lang" lang-key="services--sell-one">Prodej</h4>
							<p class="lang" lang-key="services--sell-two">Nabízíme pouze námi odzkoušené a pečlivě
								uskladněné láhve. Samozřejmostí je osobní přístup při každém nákupu. Ozvěte se a nechte
								starost na nás.</p>
						</div>
					</div>
				</div>
				<div class="logo-about aos-init aos-animated pb-5" data-aos-once="true" data-aos="zoom-in"
					data-aos-duration="1000">
					<img src="img/logos4.png" alt="Logo Wine & Art">
				</div>
			</div>
		</div>
	</div>


	<!-- Section Offer -->
	<div class="container-fluid dark">
		<div id="offer" class="container pt-4">
			<div class="row justify-content-center">
				<h1 class="display-4 mt-0 pt-5 col-12 text-center lang" lang-key="offer">Nabídka</h1>

				<!--Wine List dynamically adding from JS-->
				<ul class="nav nav-pills mb-5 justify-content-center" id="pills-tab" role="tablist">
				</ul>
				<!--Suppliers info dynamically adding from JS-->
				<div class="tab-content" id="pills-tabContent">
				</div>

				<div class="logo-about aos-init aos-animated pb-5" data-aos-once="true" data-aos="zoom-in"
					data-aos-duration="1000">
					<img src="img/logos5.png" alt="Logo Wine & Art">
				</div>
			</div>
		</div>
	</div>



	<!-- Section Contact-->
	<div class="container-fluid light">
		<div id="contact" class="container pt-4">
			<div class="row justify-content-center">
				<h1 class="display-4 mt-0 col-12 text-center pt-5 lang" lang-key="contact">Kontakt</h1>
				<div class="contact-infos">
					<h2 class="contact-quote aos-init aos-animated smooth-scroll lang" lang-key="contact--text-one"
						data-aos-once="true" data-aos="fade-right" data-aos-duration="1000">Kontaktujte
						nás telefonicky...</h2>
					<div class="row contact-options  text-center">
						<div class="col-12 col-sm-6 phone">
							<div class="phone-number row no-pad">
								<div class="col-12 col-lg-6 aos-init aos-animated" data-aos-once="true"
									data-aos="fade-down" data-aos-duration="1000"><img src="img/mar.jpg"
										alt="Marek Krejčí foto" class="rounded-circle">
								</div>
								<div class="col-12 col-lg-6 user-info user-info aos-init aos-animated"
									data-aos-once="true" data-aos="fade-right" data-aos-duration="1000">
									<p>
										<i class="fas fa-phone"></i> +420 606 119 475
									</p>
									<p>
										<i class="fas fa-user-circle"></i> Marek Krejčí
									</p>
								</div>
							</div>
						</div>

						<div class="col-12 col-sm-6 phone ">
							<div class="phone-number row no-pad">
								<div class="col-12 col-lg-6 aos-init aos-animated" data-aos-once="true"
									data-aos="fade-down" data-aos-duration="1000"><img src="img/mich.jpg"
										alt="Michal Krejčí foto" class="rounded-circle">
								</div>
								<div class="col-12 col-lg-6 user-info aos-init aos-animated" data-aos-once="true"
									data-aos="fade-right" data-aos-duration="1000">
									<p>
										<i class="fas fa-phone"></i> +420 724 152 910</p>
									<p>
										<i class="fas fa-user-circle"></i> Michal Krejčí
									</p>
								</div>
							</div>
						</div>
					</div>
					<h2 id="contactFormQt" class="contact-quote aos-init aos-animated lang" lang-key="contact--text-two"
						data-aos-once="true" data-aos="fade-down" data-aos-duration="1000">...nebo využijte přímo našeho
						kontaktního formuláře a my se ozveme Vám!</h2>
				</div>

				<form id="contactForm" method='POST' class="aos-init aos-animated" data-aos-once="true"
					data-aos="fade-up" data-aos-duration="1000">
					<input class="form-grp f-inpt animated" type="text" name="name" placeholder="Karel Novák" id="name"
						class="animated" value="<?= htmlspecialchars($name) ?>">
					<input class="form-grp f-inpt animated" type="text" name="subject" placeholder="Předmět"
						id="subject" class="animated" value="<?= htmlspecialchars($subject) ?>">
					<input class="form-grp f-inpt animated" type="text" name="email" placeholder="Vas@email.cz"
						id="email" class="animated" value="<?= htmlspecialchars($email) ?>">
					<input class="form-grp f-inpt animated" type="text" name="year" placeholder="Aktuální rok."
						id="year" class="animated">
					<textarea class="form-grp f-txtar animated" type="text" name="msg" placeholder="Text vaší zprávy."
						id="msg" class="animated"><?= htmlspecialchars($msg) ?></textarea>
					<p>
						<button class="full submit-button lang" id="submit" type="submit"
							lang-key="contact--button-send">ODESLAT</button>
					</p>
					<div class="statusElm"></div>
				</form>

				<?php 
				  if ($hlaska){
				  if ($hlaska=='Email byl úspěšně odeslán, brzy vám odpovíme. / Email was successfully sent. We will reply you as soon as possible.'){
					echo('<p align="center" style="font-size:2em;color:green;">' . htmlspecialchars($hlaska) . '</p>');
				  }
				  else {
					echo('<p style="color:red">' . htmlspecialchars($hlaska) . '</p>');
				  }
				}
				  $name = (isset($_POST['name'])) ? $_POST['name'] : '';
				  $email = (isset($_POST['email'])) ? $_POST['email'] : '';
				  $subject = (isset($_POST['subject'])) ? $_POST['subject'] : '';
				  $msg = (isset($_POST['msg'])) ? $_POST['msg'] : '';
			  ?>

				<div class="logo-about aos-init aos-animated pb-5" data-aos-once="true" data-aos="zoom-in"
					data-aos-duration="1000">
					<img src="img/logos4.png" alt="Logo Wine & Art">
				</div>
			</div>
		</div>
	</div>

	<h1 class="lang" style="background-color: whitesmoke; padding: 1em;margin: 0;text-align: center;font-weight: 100;"
		lang-key="map--heading">Kde Nás Najdete?</h1>

	<div id="mapID" class=" aos-init aos-animated" data-aos-once="true" data-aos="fade-up" data-aos-duration="1000">
	</div>

	<!-- 	<div class="container-fluid dark">
		<div id="timeline" class="container pt-4">
			<div class="row justify-content-center">
				<h1 class="display-4 mt-0 col-12 text-center pt-5">Timeline</h1>
				<div class="col-12 timeline__container">

				</div>
			</div> 
		</div> 
	</div> -->




	<!--Load the API from the specified URL
      * The async attribute allows the browser to render the page while the API loads
      * The key parameter will contain your own API key (which is not needed for this tutorial)
      * The callback parameter executes the initMap() function
      -->
	<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAU2sV_ORocG6iv3Uan0Wq6jtpYzEHShJk&callback=initMap">
	</script>




	<footer>
		<div class="container-fluid footer">
			<div class="row">
				<div class="social-sites col-12">
					<a class="fab fa-facebook-square" href="https://www.facebook.com/wineandart.cz"></a>
				</div>
				<div class="copyright col-12">
					<p>Copyright &copy;2018, WA Wine & Art s.r.o., autor: Jan Soldát </p>
				</div>
			</div>
		</div>
	</footer>

	</div>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"
		integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous">
	</script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"
		integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous">
	</script>


	<script src="js/VanillaTilt.js"></script>

	<script src="https://unpkg.com/aos@next/dist/aos.js"></script>
	<script>
		AOS.init();
	</script>



	<script src="js/mapHandler.js"></script>
	<script src="js/uiHandler.js"></script>
	<script src="js/easyHTTP.js"></script>
	<script src="js/contact.js"></script>
	<script src="js/app.js"></script>

</body>

<!--PRELOADER-->

<!-- <div class="spinner-wrapper">
	<div class="spinner">
		<div class="loader">
			<ul>
				<li></li>
				<li></li>
				<li></li>
			</ul>
			<div class="wineglass left">
				<div class="top"></div>
			</div>
			<div class="wineglass right">
				<div class="top"></div>
			</div>
		</div>
	</div>

</div> -->

<script>
	$(document).ready(function () {
		//Preloader
		$(window).on("load", function () {
			preloaderFadeOutTime = 500;

			function hidePreloader() {
				var preloader = $('.spinner-wrapper');
				preloader.fadeOut(preloaderFadeOutTime);
			}
			hidePreloader();
		});
	});
</script>

</html>	