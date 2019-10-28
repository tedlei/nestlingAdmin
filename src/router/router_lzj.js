// import引入组件

import coupon from "../components/components_lzj/rightContent/coupon/coupon";    // 优惠劵
import showCoupon from "../components/components_lzj/rightContent/coupon/showCoupon";   // 显示优惠劵
import addCoupon from "../components/components_lzj/rightContent/coupon/addCoupon";  // 优惠劵添加

export default [
    {
        path: 'coupon',
        component: coupon,
        children: [
            {
                path: '',
                component: showCoupon
            },
            {
                path: 'add',
                component: addCoupon
            }
        ]
    }
]
