<%@ page contentType="text/html;charset=UTF-8" %>
<script>
$(document).ready(function() {
	$('#goodsTable').bootstrapTable({

		  //请求方法
               method: 'get',
               //类型json
               dataType: "json",
               //显示刷新按钮
               showRefresh: true,
               //显示切换手机试图按钮
               showToggle: true,
               //显示 内容列下拉框
    	       showColumns: true,
    	       //显示到处按钮
    	       showExport: true,
    	       //显示切换分页按钮
    	       showPaginationSwitch: true,
    	       //最低显示2行
    	       minimumCountColumns: 2,
               //是否显示行间隔色
               striped: true,
               //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
               cache: false,
               //是否显示分页（*）
               pagination: true,
                //排序方式
               sortOrder: "asc",
               //初始化加载第一页，默认第一页
               pageNumber:1,
               //每页的记录行数（*）
               pageSize: 10,
               //可供选择的每页的行数（*）
               pageList: [10, 25, 50, 100],
               //这个接口需要处理bootstrap table传递的固定参数,并返回特定格式的json数据
               url: "${ctx}/shop/goods/data",
               //默认值为 'limit',传给服务端的参数为：limit, offset, search, sort, order Else
               //queryParamsType:'',
               ////查询参数,每次调用是会带上这个参数，可自定义
               queryParams : function(params) {
               	var searchParam = $("#searchForm").serializeJSON();
               	searchParam.pageNo = params.limit === undefined? "1" :params.offset/params.limit+1;
               	searchParam.pageSize = params.limit === undefined? -1 : params.limit;
               	searchParam.orderBy = params.sort === undefined? "" : params.sort+ " "+  params.order;
               	searchParam.categoryId=getSelectNodeId();
                   return searchParam;
               },
               //分页方式：client客户端分页，server服务端分页（*）
               sidePagination: "server",
               contextMenuTrigger:"right",//pc端 按右键弹出菜单
               contextMenuTriggerMobile:"press",//手机端 弹出菜单，click：单击， press：长按。
               contextMenu: '#context-menu',
               onContextMenuItem: function(row, $el){
                   if($el.data("item") == "edit"){
                   	window.location = "${ctx}/shop/goods/form?code=" + row.code;
                   } else if($el.data("item") == "delete"){
                        jh.confirm('确认要删除该商品表记录吗？', function(){
                       	jh.loading();
                       	jh.get("${ctx}/shop/goods/delete?id="+row.id, function(data){
                   	  		if(data.success){
                   	  			$('#goodsTable').bootstrapTable('refresh');
                   	  			jh.success(data.msg);
                   	  		}else{
                   	  			jh.error(data.msg);
                   	  		}
                   	  	})

                   	});

                   }
               },

               onClickRow: function(row, $el){
               },
               columns: [{
		        checkbox: true

		    }
			,{
		        field: 'code',
		        title: '产品编码',
		        sortable: true
		        ,formatter:function(value, row , index){
		        	return "<a href='${ctx}/shop/goods/form?code="+value+"'>"+value+"</a>";
		         }

		    }
			,{
		        field: 'name',
		        title: '产品名称',
		        sortable: true

		    }
			,{
		        field: 'brandName',
		        title: '产品品牌',
		        sortable: true

		    }
			,{
		        field: 'marketPrice',
		        title: '市场价',
		        sortable: true

		    }
			,{
		        field: 'cat.name',
		        title: '产品分类',
		        sortable: true

		    },{
				   field: 'state',
				   title: '是否可用',
				   sortable: true
                   ,formatter:function(value, row , index){

				   	if(0==value){
				   		return "是"
					}else{
                        return "否"
					}
    				}

			},{
			   field: 'createDate',
			   title: '创建时间',
			   sortable: true

		   	}
		     ]

		});


	  if(navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i)){//如果是移动端


		  $('#goodsTable').bootstrapTable("toggleView");
		}

	  $('#goodsTable').on('check.bs.table uncheck.bs.table load-success.bs.table ' +
                'check-all.bs.table uncheck-all.bs.table', function () {
            $('#remove').prop('disabled', ! $('#goodsTable').bootstrapTable('getSelections').length);
            $('#edit').prop('disabled', $('#goodsTable').bootstrapTable('getSelections').length!=1);
        });

		$("#btnImport").click(function(){
			jh.open({
			    type: 1,
			    area: [500, 300],
			    title:"导入数据",
			    content:$("#importBox").html() ,
			    btn: ['下载模板','确定', '关闭'],
				    btn1: function(index, layero){
					  window.location='${ctx}/shop/goods/import/template';
				  },
			    btn2: function(index, layero){
				        var inputForm =top.$("#importForm");
				        var top_iframe = top.getActiveTab().attr("name");//获取当前active的tab的iframe
				        inputForm.attr("target",top_iframe);//表单提交成功后，从服务器返回的url在当前tab中展示
				        inputForm.onsubmit = function(){
				        	jh.loading('  正在导入，请稍等...');
				        }
				        inputForm.submit();
					    jh.close(index);
				  },

				  btn3: function(index){
					  jh.close(index);
	    	       }
			});
		});

	  $("#search").click("click", function() {// 绑定查询按扭
		  $('#goodsTable').bootstrapTable('refresh');
		});

	 $("#reset").click("click", function() {// 绑定查询按扭
		  $("#searchForm  input").val("");
		  $("#searchForm  select").val("");
		  $("#searchForm  .select-item").html("");
		  $('#goodsTable').bootstrapTable('refresh');
		});


	});

  function getIdSelections() {
        return $.map($("#goodsTable").bootstrapTable('getSelections'), function (row) {
            return row.code
        });
    }

  function deleteAll(){

		jh.confirm('确认要删除该商品表记录吗？', function(){
			jh.loading();
			jh.get("${ctx}/shop/goods/deleteAll?ids=" + getIdSelections(), function(data){
         	  		if(data.success){
         	  			$('#goodsTable').bootstrapTable('refresh');
         	  			jh.success(data.msg);
         	  		}else{
         	  			jh.error(data.msg);
         	  		}
         	  	})

		})
  }
  
  
  function makeHtml(){
	  jh.openDialog("栏目静态化","${ctx}/shop/goods/goodsCategoryMakeHtml","1300","800",window)
  }
  
  
  function edit(){
	  window.location = "${ctx}/shop/goods/form?code=" + getIdSelections();
  }
  function add(aim){

      var level = aim.getAttribute("level");

      var catid = aim.getAttribute("catid");
      var catparid = aim.getAttribute("catparid");
      if(!catid){
          layer.alert("请选择左侧产品分类",{icon:2});
          return;
      }
      if(level=="1"){
          layer.alert("请选择二级分类",{icon:2});
          return;
      }
      window.location.href="${ctx}/shop/goods/form?categoryId=" + catid + "&categoryPid=" + catparid;
  }
function getSelectNodeId() {
	var nodes = $('#goodsCategoryjsTree').jstree(true).get_selected(true)[0]; //获取所有选中的节点对象
	if(undefined == nodes){
		return ;
	}else{

	return nodes.id;
	}
}



  $(function(){
      //传递分类id
      $("#goodsCategoryjsTree").on("click",function(e){
          //获取等级
          var level = e.target.parentNode.getAttribute("aria-level");
          //获取父级id
          var catparid =e.target.parentNode.parentNode.parentNode.getAttribute("id");
          //获取子集id
          var catid = e.target.parentNode.getAttribute("id");
          if(level){
          		//计入是几级列表
				$("#add").attr("level",level);
				$("#add").attr("catid",catid);
                $("#add").attr("catparid",catparid);
          }
          if(level=='1'){
              $('#goodsTable').bootstrapTable("refresh",{query:{categoryPid:catid}});
		  }else if(level=='2'){
              $('#goodsTable').bootstrapTable("refresh",{query:{categoryId:catid}});
		  }

      });
  })

var index = "";
//谨慎操作
function successFun(data){
    if(data.success){
        layer.msg(data.msg,{icon:1},function(){
            window.location.reload();
        });
    }else{
        layer.msg(data.msg,{icon:5});
    }
}
	  //一期数据导入
	function tranche(){
        jh.confirm('此操作会更新产品信息,请慎重操作!', function(index){
        	jh.post("${ctx}/shop/goods/importTranche",{},successFun);
        });
    }</script>