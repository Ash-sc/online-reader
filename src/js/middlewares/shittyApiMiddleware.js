export default function shittyApiMiddleware() {
  return next => (action) => {
    if (action.type === 'PROJECTPROGRESS_SUCCESS') {
      // unshittify (少屎) projectProgress
      const newAction = Object.assign({}, action);
      const reservedNames = ['项目成立', '付息', '兑付', '前期沟通'];
      newAction.data.reservedNames = reservedNames;
      newAction.data.content.forEach((content, i) => {
        content.projectProgressList.forEach((projectProgressItem, ii) => {
          const name = projectProgressItem.name;
          const nameEditable = !reservedNames.includes(name);
          const dateProgressEditable = !(name === '前期沟通');
          newAction.data.content[i].projectProgressList[ii] = Object.assign({}, projectProgressItem, { nameEditable, dateProgressEditable });
        });
      });
      return next(newAction);
    }
    return next(action);
  };
}
