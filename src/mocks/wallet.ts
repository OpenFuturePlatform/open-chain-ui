import { IGenerateSeedPhraseResponse } from '../actions/wallet';

export const mockWallet: IGenerateSeedPhraseResponse = {
  payload: {
    defaultWallet: {
      address: '0x62999a450A583A238BFE3B1d50293eb8C74847fD',
      keys: {
        privateKey: 'db962381653a277b5bb5f2b2e76722948a1d361b22e13237c6eb45c889a2eed8',
        publicKey: '0342bf5912bb2dc42e0485a7ef3d3aa054888b04999cd9bc927ff309cfaca8d55d'
      }
    },
    masterKeys: {
      privateKey: 'bf9d87c65ded8399ce2d4835d386698ae28aaa337c4893956bd867303860347c',
      publicKey: '02a54008f5deea06a1bd9ec995ff458d6ffa235ba40be48034a8fab6873c805bfa'
    },
    seedPhrase: 'recipe provide own axis bean exotic grocery unit flock barrel bike erosion'
  }
};
