
const routes = {
  '/' : '<ze-home></ze-home>',
  '/past-trials' : '<ze-past-trials></ze-past-trials>',
  '/how-it-wotks' : '<ze-how-it-works></ze-how-it-works>'
};

export function onNavigate (pathName){
  window.history.pushState(
    {},
    pathName,
    window.location.origin + pathName
  );
  window.document.getElementById('root').innerHTML = routes[pathName];
}
