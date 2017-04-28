export function uno() {
  return 'uno';
}

export function dos() {
  return 'dos';
}

export const $ = {
  byId(id) {
    return document.getElementById(id);
  },
  onDocument( event, handler){
     document.addEventListener(event, handler);
  },
  getDocumentState(){
    return document.readyState;
  }
};
