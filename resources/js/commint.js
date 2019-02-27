var $table = $('#table');
$(function() {
            $table.bootstrapTable({
                url:'resources/data/data1.json',    // 请求后台的数据
                height: getHeight(),                // 行高
                striped: true,                      // 是否显示行间颜色
                search: true,                       // 是否显示表格搜索，此搜索是客户端搜索，不会进服务端
                searchOnEnterKey:true,              // 
                showRefresh:true,                   // 是否显示刷新按钮
                showToggle:true,                    // 是否显示详细视图和列表视图的切换按钮
                showColumns:true,                    // 是否显示所有的列
                minimumCountColumns:2,              // 最少允许的列数
                showPaginationSwitch: true,         // 是否显示分页切换按钮
                clickToSelect: true,                // 是否启用点击选中行
                detailView: true,                   // 是否显示父子表
                detailFormatter: 'detailFormatter', // 当detailView设置为true时格式化您的详细信息视图。返回一个String，它将被附加到详细视图单元格中，可选地使用第三个参数直接渲染元素，该参数是目标单元格的jQuery元素。
                pagination: true,                   // 是否显示分页
                paginnationLoop: false,             //  是否设置启动分页连续循环模式
                clsses: 'table table-hover table-no-bordered',    // 表的类名，默认
                smartDisplay:false,                 // 是否为智能显示分页或卡片视图
                idField: 'id',                      // 指示哪个字段是标识字段
                sortName:'id',                      // 定义要排序的列
                sortOrder: 'desc',                  // 定义列排序顺序，只能是'asc'或'desc'
                escape:true,                        // 转义字符以插入HTMl，替换 &, <, >, "," 和字符
                searchOnEnterKey: true,             // 搜索方法将一直执行，直到按下enter键
                idField: 'systemId',                //  指定哪个字段是标识字段
                maintainSelected:true,              // 是否在更改页面上维护选定的行并进行搜索
                toolbar:'#toolbar',                 // jquery 选择指示工具栏
                columns:[                           // 表列配置对象
                    {field: 'state', checkbox: true},
                    {field: 'id', title: '编号', sortable: true, halign: 'center',},
                    {field: 'username', title: '账号', sortable: true, halign: 'center'},
                    {field: 'password', title: '密码', sortable: true, halign: 'center'},
                    {field: 'name', title: '姓名', sortable: true, halign: 'center'},
                    {field: 'sex', title: '性别', sortable: true, halign: 'center'},
                    {field: 'age', title: '年龄', sortable: true, halign: 'center'},
                    {field: 'phone', title: '手机', sortable: true, halign: 'center'},
                    {field: 'email', title: '邮箱', sortable: true, halign: 'center'},
                    {field: 'address', title: '地址', sortable: true, halign: 'center'},
                    {field: 'remark', title: '备注', sortable: true, halign: 'center'},
                    //  formatter：单元格格式化函数，取三个参数：value :字段值， row:行记录数据 ，index:行索引
                    //  event: 使用格式化函数时的单元事件监听器，取四个参数：event:jquery事件， value：字段值， row: 行记录数据， index：行索引
                    {field: 'action', title: '操作', halign: 'center', align: 'center', formatter: 'actionFormatter', events: 'actionEvents', clickToSelect: false},
                ]
            }).on('all.bs.table',function(e,name,args){
                $('[data-toggle = "tooltip"]').tooltip();
                $('[data-toggle="popover"]').popover();  
            });
        });

        /**
         * format 格式化HTML
         * events 事件
         * cellStyle 单元格样式
         */
        // 单元格式化函数
        function actionFormatter(value,row,index){
            return[
                '<a class="like" href="javascript:void(0)" data-toggle="tooltip" title="Like"><i class="glyphicon glyphicon-heart"></i></a>　',
                '<a class="edit ml10" href="javascript:void(0)" data-toggle="tooltip" title="Edit"><i class="glyphicon glyphicon-edit"></i></a>　',
                '<a class="remove ml10" href="javascript:void(0)" data-toggle="tooltip" title="Remove"><i class="glyphicon glyphicon-remove"></i></a>'
            ].join('');
        };

        // 使用格式化函数时的单元事件监听器
        window.actionEvents = {
            'click .like':function(e,value,row,index){
                alert('You click like icon, row:'+JSON.stringify(row));
                console.log(value,row,index);
            },
            'click .edit':function(e,value,row,index){
                alert('You click like icon, row:'+JSON.stringify(row));
                console.log(value,row,index);
            },
            'click .remove':function(e,value,row,index){
                alert('You click like icon, row:'+JSON.stringify(row));
                console.log(value,row,index);
            },
        };

        function getHeight() {
            return $(window).height() - 20;
        };

        //数据表格每行展开的内容 
        function detailFormatter(index,row){
            var html = [];
            $.each(row, function (key, value) {
                html.push('<p><b>' + key + ':</b> ' + value + '</p>');
            });
            return html.join('');
        };

        // 新增用户弹出框 使用jquery-confirm 消息弹出框插件
        function createAction() {
            $.confirm({
                type: 'dark',
		        animationSpeed: 300,
                title:'新增系统',
                content:$('#createDialog').html(),
                buttons:{
                    confirm: {
                        text:'确认',
                        btnClass: 'waves-effect waves-button',
                        action:function(){
                            $.alert('确认');
                        }
                    },
                    cancel:{
                        text:'取消',
                        btnClass: 'waves-effect waves-button',
                        
                    }
                }
            });
        }

        // 编辑用户弹出框
        function updateAction() {  
            var rows = $table.bootstrapTable('getSelections');
            if(rows.length == 0){
                $.confirm({
                    title:false,
                    content:'请至少选择一条记录！',
                    autoClose: 'cancel|3000',           // 3 秒后自动关闭，并把倒计时显示在cancel设置的按钮上
                    backgroundDismiss: true,            // 控制用户在模态框外部单击时会取消刚刚点击的事件，默认为false
                    buttons:{                           // 定义按钮的样式跟文字
                        cancel:{
                            text:'取消',
                            btnClass: 'waves-effect waves-button'
                        }
                    }
                });
            }else {
                $.confirm({
                    type:'blue',
                    animationSpeed: 300,
                    title:"编辑系统",
                    content:$('#createDialog').html(),
                    buttons:{
                        confirm:{               // 确认框
                            text:'确认',
                            btnClass: 'waves-effect waves-button',
                            // 回调函数
                            action:function(){
                                $.alert('确认');
                            }
                        },
                        cancel:{                // 按钮6
                            text:'取消',
                            btnClass: 'waves-effect waves-button',
                        }
                    }
                })
            }
        }

        // 删除用户弹出框
        function removeAction(){
            var rows = $table.bootstrapTable('getSelections');
            if(rows.length == 0){
                $.confirm({
                    title:false,
                    content:'请至少选择一条记录！',
                    autoClose: 'cancel|3000',
                    backgroundDismiss: true,        // 点击背景板弹框消失
                    buttons:{
                        cancel:{
                            text:'取消',
                            btnClass: 'waves-effect waves-button'
                        }
                    }
                });
            }else{
                $.confirm({
                    type:'red',
                    animationSpeed: 300,
                    title:false,
                    content:'确认删除该系统吗？',
                    buttons:{
                        confirm:{
                            text:'删除',
                            btnClass: 'waves-effect waves-button',
                        },
                        cancel:{
                            text:'取消',
                            btnClass: 'waves-effect waves-button',
                        }
                    }   
                })
            }
        }
