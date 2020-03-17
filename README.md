# pantone.luhui.net


鲁虺网络潘通色卡云 http://pantone.luhui.net 鲁虺彩通色卡工具探索色彩的宇宙,发现色彩搭配、色值及互相参照包括RGB、CMYK、HEX及广色域参考色彩,分享至您的工作流程中与社群媒体上与luhui Creative Cloud、Instagram及其他更多的社群无缝接轨 


代码运行在
[![Netlify Status](https://api.netlify.com/api/v1/badges/e2e1698e-f85d-459d-a7d7-1382a70dc00c/deploy-status)](https://app.netlify.com/sites/pantone/deploys)

免费域名演示地址
http://pantone.netlify.com


自定义域名演示地址
http://pantone.luhui.net

http://pantong.luhui.net/

http://seka.luhui.net/


搜索调用模式

index.html?q=关键词



  <script type="text/javascript">     
  
            window.onload=function () {
            
                      function _GetUrlParams() {
                      
                var url = location.search; //获取url中"?"符后的字串
                
                var theRequest = {};
                
                if (url.indexOf("?") != -1) {
                
                    var str = url.substr(1);
                    
                    strs = str.split("&");
                    
                    for (var i = 0; i < strs.length; i++) {
                    
                        //console.log(strs);
                        
                        theRequest[strs.split("=")[0]] = unescape(strs.split("=")[1]);
                        
                    }
                }
                return theRequest;
                
            }
            var obj = _GetUrlParams();
            
            if(obj.q){
            
              var bingurl=obj.q;
                          document.getElementById('engine').src = 'http://luhui.net/index.php?q=' + escape(bingurl);
                          
                           $("#cnbing").addClass("on");
                           
                           $("#google").removeClass("on");
                           
                          //console.log(bingurl);
                                }
            }
            </script>






















