import * as React from 'react';
import './InfoPopup.css';

import cancel from '../img/cancel.svg';

interface IProps {
  closePopup(): void;
}

const InfoPopup = ({ closePopup }: IProps) => {
  return (
    <div className="popup-area">
      <div className="info-popup">
        <div className="close-popup" onClick={closePopup}>
          CLOSE <img src={cancel} alt="close" />
        </div>
        <h2 className="main-title">
          Disclaimer <br /> Text
        </h2>
        <div className="content">
          <p>Please take some time to understand some important things for your own safety.</p>
          <p>
            We cannot recover your funds or freeze your account if you visit a phishing site or lose your backup phrase
            (aka SEED phrase).
          </p>
          <p>
            By continuing to use our platform, you agree to accept all risks associated with the loss of your SEED,
            including but not limited to the inability to obtain your funds and dispose of them. In case you lose your
            SEED, you agree and acknowledge that the OPEN Platform would not be responsible for the negative
            consequences of this.
          </p>
          <p>
            If you forget your password, you can easily create a new one by using the account recovery form via your
            secret phrase. If you lose your secret phrase, however, you will have no way to access your account.
          </p>
          <p>
            You cannot change your secret phrase. If you accidentally sent it to someone or suspect that scammers have
            taken it over, then create a new OPEN wallet immediately and transfer your funds to it.
          </p>
        </div>
        <button className="button" onClick={closePopup}>
          <div />
          <span>Done</span>
        </button>
      </div>
    </div>
  );
};

export default InfoPopup;
