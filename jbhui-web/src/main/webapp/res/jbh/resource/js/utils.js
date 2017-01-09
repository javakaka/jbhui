/**
 * 添加商品到购物车
 * @param goodsId
 * @param goodsNum
 */
function addGoodsToCart(goodsId, goodsNum)
{
	if(isEmpty( goodsId ))
	{
		return false;
	}
	if(isEmpty(goodsNum))
	{
		goodsNum =1;
	}
	var goodsCarItem =goodsId+"@"+goodsNum;
	var shopCarCookie =loadCookie("shop_car");
	if( typeof  shopCarCookie == "undefined" || shopCarCookie == "" || shopCarCookie == null || shopCarCookie == "null")
	{
		shopCarCookie =goodsCarItem;
		setCookie("shop_car",shopCarCookie );
	}
	else
	{
		//判断ID是否已经在列表中
		var isAlreadyStored =false;
		var goodsArr =shopCarCookie.split(",");
		if( typeof goodsArr != "undefined" )
		{
			for(var i=0; i< goodsArr.length; i++)
			{
				var itemArr =goodsArr[i].split("@");
				if( typeof itemArr != "undefined" && itemArr != "" )
				{
					var storeGoodsId =itemArr[0];
					if(goodsId == storeGoodsId)
					{
						isAlreadyStored =true;
						break;
					}
				}
			}
		}
		if( ! isAlreadyStored )
		{
			shopCarCookie =shopCarCookie+","+goodsCarItem;
			setCookie("shop_car",shopCarCookie );
		}
	}
}

/**
 * 加载购物车中全部的商品ID列表
 * @returns
 */
function loadShopCardGoods()
{
	var goodsIdArr ="";
	var shopCarCookie =loadCookie("shop_car");
	if( typeof  shopCarCookie == "undefined" || shopCarCookie == "" || shopCarCookie == null || shopCarCookie == "null")
	{
		return "";
	}
	else
	{
		var goodsArr =shopCarCookie.split(",");
		if( typeof goodsArr != "undefined" )
		{
			for(var i=0; i< goodsArr.length; i++)
			{
				var itemArr =goodsArr[i].split("@");
				if( typeof itemArr != "undefined" && itemArr != "" )
				{
					if(goodsIdArr == "")
					{
						goodsIdArr +="'"+itemArr[0]+"'"
					}
					else
					{
						goodsIdArr +=",'"+itemArr[0]+"'"
					}
				}
			}
		}
	}
	console.log("goodsIdArr......................."+goodsIdArr);
	return goodsIdArr;
}

/**
 * 分页加载购物车中的商品ID列表
 * @returns
 */
function loadShopCardGoodsPage(page, pageSize)
{
	if(isEmpty(page) )
	{
		return loadShopCardGoods();
	}
	if(isEmpty(pageSize) )
	{
		pageSize =10;
	}
	var start =(parseInt( page )-1)*parseInt(pageSize);
	var end =start +parseInt(pageSize);
	var goodsIdArr ="";
	var shopCarCookie =loadCookie("shop_car");
	if( typeof  shopCarCookie == "undefined" || shopCarCookie == "" || shopCarCookie == null || shopCarCookie == "null")
	{
		return "";
	}
	else
	{
		var goodsArr =shopCarCookie.split(",");
		if( typeof goodsArr != "undefined" )
		{
			for(var i=start; i< goodsArr.length && i<end ; i++)
			{
				var itemArr =goodsArr[i].split("@");
				if( typeof itemArr != "undefined" && itemArr != "" )
				{
					goodsIdArr.push( itemArr[0] );
				}
			}
		}
	}
	console.log("......................."+goodsIdArr);
	return goodsIdArr;
}





