$(function() {

	// init date tables
	var job_bus_group_Table = $("#job_bus_group").dataTable({
		"deferRender": true,
		"processing" : false,
	    "serverSide": true,
		"ajax": {
			url: base_url + "/jobbusgroup/pageList",
			type:"post",
	        data : function ( d ) {
	        	var obj = {};
	        	obj.start = d.start;
	        	obj.length = d.length;
                return obj;
            }
	    },
	    "searching": false,
	    "ordering": false,
	    //"scrollX": true,	// scroll x，close self-adaption
	    "columns": [
	                {
	                	"data": 'id',
						"visible" : true,
						"width":'5%'
					},
	                {
	                	"data": 'name',
						"visible" : true,
						"width":'10%'
					},
	                {
						"data": I18n.system_opt ,
						"width":'15%',
	                	"render": function ( data, type, row ) {
	                		return function(){
								// html
                                tableData['key'+row.id] = row;
								var html = '<p id="'+ row.id +'" >'+
									'<button class="btn btn-warning btn-xs update" type="button">'+ I18n.system_opt_edit +'</button>  '+
									'<button class="btn btn-danger btn-xs delete" type="button">'+ I18n.system_opt_del +'</button>  '+
									'</p>';

	                			return html;
							};
	                	}
	                }
	            ],
		"language" : {
			"sProcessing" : I18n.dataTable_sProcessing ,
			"sLengthMenu" : I18n.dataTable_sLengthMenu ,
			"sZeroRecords" : I18n.dataTable_sZeroRecords ,
			"sInfo" : I18n.dataTable_sInfo ,
			"sInfoEmpty" : I18n.dataTable_sInfoEmpty ,
			"sInfoFiltered" : I18n.dataTable_sInfoFiltered ,
			"sInfoPostFix" : "",
			"sSearch" : I18n.dataTable_sSearch ,
			"sUrl" : "",
			"sEmptyTable" : I18n.dataTable_sEmptyTable ,
			"sLoadingRecords" : I18n.dataTable_sLoadingRecords ,
			"sInfoThousands" : ",",
			"oPaginate" : {
				"sFirst" : I18n.dataTable_sFirst ,
				"sPrevious" : I18n.dataTable_sPrevious ,
				"sNext" : I18n.dataTable_sNext ,
				"sLast" : I18n.dataTable_sLast
			},
			"oAria" : {
				"sSortAscending" : I18n.dataTable_sSortAscending ,
				"sSortDescending" : I18n.dataTable_sSortDescending
			}
		}
	});
    // table data
    var tableData = {};

    // add
    $(".add").click(function(){
        $('#addModal').modal({backdrop: false, keyboard: false}).modal('show');
    });


    var addModalValidate = $("#addModal .form").validate({
    		errorElement : 'span',
            errorClass : 'help-block',
            focusInvalid : true,
            rules : {
              busname : {
                  required : true,
                  rangelength:[2, 20]
              	}
            },
            messages : {
                busname : {
                	required : I18n.system_please_input + I18n.jobinfo_busgroup_name,
                    rangelength: I18n.system_lengh_limit + "2到20"
                }
            },
    		highlight : function(element) {
                $(element).closest('.form-group').addClass('has-error');
            },
            success : function(label) {
                label.closest('.form-group').removeClass('has-error');
                label.remove();
            },
            errorPlacement : function(error, element) {
                element.parent('div').append(error);
            },
            submitHandler : function(form) {

         		var paramData = {
    				"name": $("#addModal .form input[name=busname]").val()
    			};
            	$.post(base_url + "/jobbusgroup/add", paramData, function(data, status) {
        			if (data.code == "200") {
    					$('#addModal').modal('hide');

                        layer.msg( I18n.system_add_suc );
                        job_bus_group_Table.fnDraw();
        			} else {
    					layer.open({
    						title: I18n.system_tips ,
                            btn: [ I18n.system_ok ],
    						content: (data.msg || I18n.system_add_fail),
    						icon: '2'
    					});
        			}
        		});
    		}
    	});
    	$("#addModal").on('hide.bs.modal', function () {
        		$("#addModal .form")[0].reset();
        		addModalValidate.resetForm();
        		$("#addModal .form .form-group").removeClass("has-error");
        		$(".remote_panel").show();	// remote
        	});
        //更新
        $("#job_bus_group").on('click', '.update',function() {

                var id = $(this).parent('p').attr("id");
                var row = tableData['key'+id];

        		// base data
        		window.sessionStorage.setItem('busID',row.id);
        		$("#updateModal .form input[name='busname']").attr('placeholder',row.name);

        		// show
        		$('#updateModal').modal({backdrop: false, keyboard: false}).modal('show');
        	});
        var updateModalValidate = $("#updateModal .form").validate({
            errorElement : 'span',
            errorClass : 'help-block',
            focusInvalid : true,
            rules : {
                busname : {
                      required : true,
                      rangelength:[2, 20]
                    }
                },
                messages : {
                busname : {
                    required : I18n.system_please_input + I18n.jobinfo_busgroup_name,
                    rangelength: I18n.system_lengh_limit + "2到20"
                }
                },
            highlight : function(element) {
                $(element).closest('.form-group').addClass('has-error');
            },
            success : function(label) {
                label.closest('.form-group').removeClass('has-error');
                label.remove();
            },
            errorPlacement : function(error, element) {
                element.parent('div').append(error);
            },
            submitHandler : function(form) {
                var paramData = {
                    "name": $("#updateModal .form input[name=busname]").val(),
                    "id": window.sessionStorage.getItem("busID")
                };

                $.post(base_url + "/jobbusgroup/update", paramData, function(data, status) {
                    if (data.code == "200") {
                        $('#updateModal').modal('hide');

                        layer.msg( I18n.system_update_suc );
                        job_bus_group_Table.fnDraw();
                        sessionStorage.removeItem("busID")
                    } else {
                        layer.open({
                            title: I18n.system_tips ,
                            btn: [ I18n.system_ok ],
                            content: (data.msg || I18n.system_update_fail),
                            icon: '2'
                        });
                    }
                });
            }
        });
        $("#updateModal").on('hide.bs.modal', function () {
            $("#updateModal .form")[0].reset();
            updateModalValidate.resetForm();
            $("#updateModal .form .form-group").removeClass("has-error");
            $(".remote_panel").show();	// remote
        });

        //删除
        $("#job_bus_group").on('click', '.delete',function() {
        		var id = $(this).parent('p').attr("id");

        		layer.confirm( I18n.system_ok + I18n.system_opt_del + '?', {
        			icon: 3,
        			title: I18n.system_tips ,
                    btn: [ I18n.system_ok, I18n.system_cancel ]
        		}, function(index){
        			layer.close(index);

        			$.ajax({
        				type : 'POST',
        				url : base_url + "/jobbusgroup/delete",
        				data : {
        					"id" : id
        				},
        				dataType : "json",
        				success : function(data){
        					if (data.code == 200) {
                                layer.msg( I18n.system_success );
        						job_bus_group_Table.fnDraw(false);
        					} else {
                                layer.msg( data.msg || I18n.system_opt_del + I18n.system_fail );
        					}
        				}
        			});
        		});
        	});


});
