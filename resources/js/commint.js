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

        function getHeight() {
            return $(window).height() - 20;
        }