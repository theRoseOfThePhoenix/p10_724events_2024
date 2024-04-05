// @ts-nocheck
import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    // changement du signe < en > pour ordre décdroisant
    new Date(evtA.date) > new Date(evtB.date) ? -1 : 1
  );
  const nextCard = () => {
    // ajout d'une condition if pour vérifier que byDateDesc n'est pas undefined
    if (byDateDesc !== undefined) {
      setTimeout(
        // ajout du -1 pour complèter le tableau pour qu'il boucle bien sur les donner existant
        () => setIndex(index < byDateDesc.length - 1 ? index + 1 : 0),
        5000
      );
    }
  };
  useEffect(() => {
    nextCard();
  });
  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        // ajout de la clé unique dans l'espace vide pour la div <>
        <div key={event.title}>
          <div
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc.map((_, radioIdx) => (
                <input
                  // ajout de cle unique sur  event title et radioIDX
                  key={`${event.title}_${radioIdx + 0}`}
                  type="radio"
                  name="radio-button"
                  // remplacement de Idx par index pour une bonne comparaison
                  checked={index === radioIdx}
                  readOnly
                />
              ))}
            </div>
          </div>
        </div> // fermeture de la nouvelle div
      ))}
    </div>
  );
};

export default Slider;
