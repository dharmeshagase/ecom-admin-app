const categoryList = (categories, options = []) => {
    // console.log(categories);
    for (let category of categories) {
        options.push({ _id: category._id, name: category.name, parentId: category.parentId,type:category.type })
        if (category.children.length > 0) {
            categoryList(category.children, options)
        }
    }
    // console.log(options);
    return options;
}
export default categoryList;