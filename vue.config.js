module.exports = {
    devServer: {                //记住，别写错了devServer//设置本地默认端口  选填
        port: 7575,
        proxy: {                 //设置代理，必须填
            '/api': {              //设置拦截器  拦截器格式   斜杠+拦截器名字，名字可以自己定
                target: 'http://220.179.227.205:6018',     //代理的目标地址
                changeOrigin: true,              //是否设置同源，输入是的
                pathRewrite: {                   //路径重写
                    '/api': ''                     //选择忽略拦截器里面的单词
                }
            },
            '/AI': {              //设置拦截器  拦截器格式   斜杠+拦截器名字，名字可以自己定
                target: 'http://220.179.227.205:6030',     //代理的目标地址
                changeOrigin: true,              //是否设置同源，输入是的
                pathRewrite: {                   //路径重写
                    '/AI': ''                     //选择忽略拦截器里面的单词
                }
            },
            '/two': {              //设置拦截器  拦截器格式   斜杠+拦截器名字，名字可以自己定
                target: 'http://220.179.227.205:6019',     //代理的目标地址
                changeOrigin: true,              //是否设置同源，输入是的
                pathRewrite: {                   //路径重写
                    '/two': ''                     //选择忽略拦截器里面的单词
                }
            },
            '/three': {              //设置拦截器  拦截器格式   斜杠+拦截器名字，名字可以自己定
                target: 'http://220.179.227.205:6022',     //代理的目标地址
                changeOrigin: true,              //是否设置同源，输入是的
                pathRewrite: {                   //路径重写
                    '/three': ''                     //选择忽略拦截器里面的单词
                }
            },
            '/four': {              //设置拦截器  拦截器格式   斜杠+拦截器名字，名字可以自己定
                target: 'http://220.179.227.205:6014/api/v1',     //代理的目标地址
                changeOrigin: true,              //是否设置同源，输入是的
                pathRewrite: {                   //路径重写
                    '/four': ''                     //选择忽略拦截器里面的单词
                }
            },
            '/ali': {              //设置拦截器  拦截器格式   斜杠+拦截器名字，名字可以自己定
                target: 'http://eid.shumaidata.com/eid/check',     //代理的目标地址
                changeOrigin: true,              //是否设置同源，输入是的
                pathRewrite: {                   //路径重写
                    '/ali': ''                     //选择忽略拦截器里面的单词
                }
            },
            '/baidu1': {              //设置拦截器  拦截器格式   斜杠+拦截器名字，名字可以自己定
                  target: 'https://aip.baidubce.com/oauth/2.0/token',     //代理的目标地址
                  changeOrigin: true,              //是否设置同源，输入是的
                    pathRewrite: {                   //路径重写
                   '/baidu1': ''                     //选择忽略拦截器里面的单词
    }
},
            '/baidu2': {              //设置拦截器  拦截器格式   斜杠+拦截器名字，名字可以自己定
                target: 'http://vop.baidu.com/server_api',     //代理的目标地址
                changeOrigin: true,              //是否设置同源，输入是的
                pathRewrite: {                   //路径重写
                    '/baidu2': ''                     //选择忽略拦截器里面的单词
                }
            },
        }
    },
    publicPath: './'
}
