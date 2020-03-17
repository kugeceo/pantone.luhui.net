# pantone.luhui.net








[![Netlify Status](https://api.netlify.com/api/v1/badges/e2e1698e-f85d-459d-a7d7-1382a70dc00c/deploy-status)](https://app.netlify.com/sites/pantone/deploys)





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






















