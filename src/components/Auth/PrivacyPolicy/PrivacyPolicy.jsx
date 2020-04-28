import React from 'react';
import { NavLink } from 'react-router-dom';

const PrivacyPolicy = () => {
    return (
        <div style={{ marginTop: '30px' }}>
            <div className='card border-success mb-3' style={{ backgroundColor: 'rgb(255,255,255, 0.5)' }}>
                <div className='card-header'>
                    <h1>Privatumo politika</h1>
                </div>
                <div className='card-body' style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}>

                    <p className='card-text'>
                        Labai svarbu, kad atidžiai perskaitytumėte Privatumo politiką, nes, kiekvieną kartą lankydamiesi Duomenų valdytojui priklausančią interneto svetainę sutinkate su sąlygomis, aprašytomis šioje Privatumo politikoje. Jei nesutinkate su šiomis sąlygomis, prašome nesilankyti mūsų svetainėje, nesinaudoti mūsų turiniu ir/ar paslaugomis.
            </p>
                    <p className='card-text'>
                        Patvirtiname, kad Duomenų valdytojo svetainės lankytojų duomenys bus renkami laikantis galiojančių Europos Sąjungos bei Lietuvos Respublikos teisės aktų reikalavimų bei kontroliuojančių institucijų nurodymų. Taikomos visos protingos techninės ir administracinės priemonės tam, kad mūsų surinkti duomenys apie svetainės lankytojus būtų apsaugomi nuo praradimo, neleistino naudojimo ar pakeitimų.
                </p>
                    <p className='card-text'>
                        Duomenų subjektas, kurio duomenys tvarkomi Duomenų valdytojo veikloje, turi šias teises:
                        Žinoti ( būti informuotas) apie savo duomenų tvarkymą (teisė žinoti);
                        Susipažinti su savo duomenimis ir kaip jie yra tvarkomi (teisė susipažinti);
                        Reikalauti ištaisyti arba, atsižvelgiant į asmens duomenų tvarkymo tikslus, papildyti asmens neišsamius asmens duomenis (teisė ištaisyti);
                        Savo duomenis sunaikinti arba sustabdyti savo duomenų tvarkymo veiksmus (išskyrus saugojimą) (teisė sunaikinti ir teisė „būti pamirštam“);
                        Turi teisę reikalauti, kad asmens Duomenų valdytojas apribotų asmens duomenų tvarkymą esant vienai iš teisėtų priežasčių (teisė apriboti);
                        Turi teisę į duomenų perkėlimą (teisė perkelti);
                </p>
                    <p className='card-text'>
                        Kai naudojate naršyklę mūsų teikiamam turiniui pasiekti, galite konfigūruoti savo naršyklę taip, kad būtų priimti visi slapukai, atmesti visi slapukai arba būtų pranešama, kai slapukas atsiunčiamas. Kiekviena naršyklė skirtinga, todėl, jei nežinote kaip pakeisti slapukų nuostatas, pasižiūrėkite jos žinyno meniu. Jūsų įrenginio operacinėje sistemoje gali būti papildomų slapukų valdiklių. Jei nenorite, kad informacija būtų renkama slapukų pagalba, pasinaudokite daugelyje naršyklių esama paprasta procedūra, kuri leidžia jums atsisakyti slapukų naudojimosi. Norėdami daugiau sužinoti, kaip valdyti slapukus, apsilankykite adresu: http://www.allaboutcookies.org/. Tačiau atkreipiame dėmesį, kad kai kuriasi atvejais slapukų ištrynimas gali sulėtinti naršymo internete spartą, apriboti tam tikrų interneto svetainės funkcijų veikimą arba blokuoti prieigą prie svetainės. Mūsų svetainėje gali būti nuorodų į kitų asmenų, įmonių ar organizacijų interneto tinklapius. Atkreipiame dėmesį, kad Duomenų valdytojas nėra atsakingas už tokių interneto tinklalapių turinį ar jų naudojamus privatumo užtikrinimo principus. Tad jei paspaudę nuorodą iš Duomenų valdytojo interneto svetainės pateksite į kitus tinklalapius, turėtumėte atskirai pasidomėti jų Privatumo politika.
                </p>
                    <p className='card-text'>
                        Jei dėl šioje Privatumo politikoje pateiktos informacijos jums iškiltų klausimų, maloniai prašome kreiptis bet kuriuo Jums patogiu būdu!
                </p>
                    <NavLink to='/Registration'>
                        <span className='badge badge-primary'>
                            <i className='fas fa-angle-double-left' />
                            &nbsp;Atgal&nbsp;
                         </span>
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;