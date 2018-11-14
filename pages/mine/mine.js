/**
 * @file 我的
 * @author 小强赵
 */
import commonUtil from '../../utils/common';

let timer;
let token;
let newMatchNum;
let originMatchNum = 0;

Page({
    data: {
        userInfo: {},
        token
    },

    // onLoad() {
    //     commonUtil.getStorageData(
    //         'headerImgSrc',
    //         // 实名认证
    //         'realname',
    //         'idcard',

    //         // 个人信息
    //         'career',
    //         'wxaccount',

    //         // 我的知识
    //         'title',
    //         'content',
    //         'token'
    //     ).then(res => {
    //         if (!res.content) {
    //           res.content = '我对这个知识有一些经验，期待与你分享感受，互相交换，一起学习进步。'
    //         }
    //         token = res.token;
    //         this.setData({
    //             userInfo: res
    //         });
    //     });
    // },
    onShow() {
        timer = setInterval(() => {
            commonUtil.getMatchList({
                token: token
            }).then(res => {
                newMatchNum = res.number;
            });

            if (newMatchNum - originMatchNum > -1) {
                wx.setTabBarBadge({
                    index: 1,
                    text: `${newMatchNum - originMatchNum}`
                });
            }
        }, 5000);
        commonUtil.getStorageData(
            'headerImgSrc',
            // 实名认证
            'realname',
            'idcard',

            // 个人信息
            'career',
            'wxaccount',

            // 我的知识
            'title',
            'content',
            'token'
        ).then(res => {
            if (!res.content) {
                res.content = '我对这个知识有一些经验，期待与你分享感受，互相交换，一起学习进步。'
            }
            token = res.token;
            this.setData({
                userInfo: res
            });
        });
    },
    onHide() {
        clearInterval(timer)
    },
    navigateToRealName() {
        wx.navigateTo({
            url: '/pages/real-name/real-name'
        });
    },
    navigateToMyKnowledge() {
        wx.navigateTo({
            url: '/pages/my-knowledge/my-knowledge?type=1'
        });
    }
});
