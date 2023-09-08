const articles = document.getElementById('articles');
const panier = document.getElementById('panier');
const inputPrix = document.getElementById('prix');
inputPrix.value = 0;


let listArticleIntoCart = []

function addToCart(articleId) {
    let articleName = articles.lastElementChild.children[articleId-1].firstElementChild.innerHTML;
    let articlePrice = Number(articles.lastElementChild.children[articleId-1].children[1].innerHTML);
    let articleQty = 1

    //system d'addition d'article au lieu de list total
    let articleExistIndex = listArticleIntoCart.findIndex((eachItem) => {
        if(eachItem.articleId == articleId)
            return true
        else
            return false
    })

    //console.log(articleExistIndex)

    if(articleExistIndex >= 0)
    {
        //existe déjà
        listArticleIntoCart[articleExistIndex].articleQty += 1
    }
    else{
        //n'existe pas
        let newArt = {articleName, articlePrice, articleQty, articleId}
        listArticleIntoCart.push(newArt)
    }
    
    
    
    appendArticleHtml()
    recalculeTotalPrice("add")
}

function recalculeTotalPrice(operator)
{
    if(listArticleIntoCart.length  == 0) inputPrix.value = 0


    listArticleIntoCart.forEach((eachArticle) => {
        if(operator == "add")
            inputPrix.value = Number(inputPrix.value) + Number(eachArticle.articlePrice)

        else if(operator == "delete")
            inputPrix.value = Number(inputPrix.value) - Number(eachArticle.articlePrice)
    })
}


function appendArticleHtml()
{
    let newTbody = document.createElement("tobdy")
    let oldTbody = panier.children[1]
    
    panier.replaceChild(newTbody, oldTbody)

    listArticleIntoCart.forEach((eachArticle) => 
    {
        const articleTd = document.createElement('td');
        articleTd.innerText = eachArticle.articleName;
        //<td>Chaise</td>
        

        const prixTd = document.createElement('td');
        prixTd.innerText = eachArticle.articlePrice;
        //<td>25</td>

        const qtyTd = document.createElement("td")
        qtyTd.innerText = eachArticle.articleQty
        //<td>un certain nomber</td>


        const newTr = document.createElement('tr');
        newTr.appendChild(articleTd);
        newTr.appendChild(prixTd);
        newTr.appendChild(qtyTd)
        // <tr>
        //     <td>Chaise</td>
        //     <td>25</td>
        //      <td>un certain nomber</td>
        // </tr>

    
        panier.children[1].appendChild(newTr); //panier.children[1] = <table><tbody> !!!!! </tabody></table>
        //<tbody>
        //   <tr>
        //     <td>Chaise</td>
        //     <td>25</td>
        //   </tr>
        //</tbody>
    })
}


function delToCart(articleId)
{
    //system d'addition d'article au lieu de list total
    let articleExistIndex = listArticleIntoCart.findIndex((eachItem) => {
        if(eachItem.articleId == articleId)
            return true
        else
            return false
    })


    if(articleExistIndex >= 0)
    {
        //existe déjà
        //on vérifie la quantité existante
        if(listArticleIntoCart[articleExistIndex].articleQty == 1){
            //attention de ne pas recuprérer la shallow copy du splice... 
            listArticleIntoCart.splice(0, 1)
        }

        else
            listArticleIntoCart[articleExistIndex].articleQty -= 1
    }

    
    recalculeTotalPrice("delete")
    appendArticleHtml()
}