import VanillaModal from 'vanilla-modal';

export function setModal() {
  console.log('modal set up');
  const options={};
  const modal = new VanillaModal(options);
  console.log(modal);
}
