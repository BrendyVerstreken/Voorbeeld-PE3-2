# PE03 Webshop
Maak een webshop naar keuze met behulp van Javascript.

## JSON
De producten van deze webshop worden bijgehouden in een JSON-bestand, dat je toevoegt aan de `docs/api` map.
Gebruik Github Pages om het bestand via het internet toegankelijk te maken. Je leest de JSON dus effectief uit door eerst een bevraging over internet te doen.

De inhoud van de webshop zijn producten naar keuze, maar voorzie:
- minstens **3 categorieën** van producten
- minimaal 3 producten per categorie 
- minimaal 2 foto's per product

*Bijvoorbeeld: een computerwebshop. Deze biedt 3 categorieën aan: laptops, desktops en tablets. Per categorie zijn er minstens 3 producten aanwezig. Elk product heeft dan weer minstens twee foto's.*

> **Belangrijk!**
>
> Indien je er niet in slaagt om de data vanaf je online bron uit te lezen, dan mag je een lokaal .js bestand gebruiken. Dit gaat echter ten koste van punten.

Het JSON object bestaat dus minimaal uit 3 niveau's, waarin minimaal 1 array wordt gebruikt. Hieronder een voorbeeld van een JSON-bestand met een ander onderwerp:

![json voorbeeld](/img/jsonVoorbeeld.png)

# Functionaliteiten en uitwerking
## Opstart
Bij de opstart krijgt de gebruiker alle producten te zien. De gebruikte formulierelementen worden **dynamisch** opgevuld.   

Van de producten worden minimaal volgende zaken getoond:
- Naam van het product
- Categorie van het product
- Foto's van het product
- Prijs van het product (weergave met 2 cijfers na de komma) 

De gebruiker kan via een selectie enkel de producten van een gekozen categorie tonen.

## Bestellen
Voorzie functionaliteit zodat de gebruiker een product kan bestellen. 
Het **aantal** bestelde producten wordt bijgehouden in een winkelmandje bovenaan de webpagina.
Het is voor een gebruiker toegelaten meerdere keren hetzelfde product te bestellen.

## Winkelmandje
Wanneer de gebruiker klikt op het winkelmandje dan krijgt hij/zij een overzicht van de bestelde producten. 
- Voorzie de nodige codelogica, zodat een besteld product slechts 1 keer in de bestellijst voorkomt, met daarnaast het aantal bestelde eenheden.
- De totaalprijs van de bestellingen wordt  weergegeven.
- Voorzie ook de mogelijkheid om (reeds gemaakte) bestelde producten uit de winkelmand te verwijderen.

De gebruiker kan na het bekijken van de winkelmand nog producten bijbestellen als hij/zij dit wenst.

## Formulierelementen
Je gebruikt minimaal 2 verschillende formulierelementen waaronder minimaal 1 select.

## Opmaak
Je voorziet zelf een opmaak. Gebruik hiervoor een **separate** css-file.

## EventHandling
Gebruik enkel geavanceerde EventHandlers. Inline Event Handlers zijn dus uit den boze.
