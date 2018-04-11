jQuery(document).ready(function(){         
	jQuery('#subject-ranking').click(function(){
		jQuery('#ranking__subject_subj-selection, #step-2').hide().animate({opacity:'show'}, 500);
		jQuery('#ranking__university_univ-selection, #ranking__university-table, #ranking__university-table').hide();
		get_all_sector();
        get_all_category('subject');
	});
	var univ_th_ctgr;
	var univ_th_crtr;
	var univ_th_sort;
        
	jQuery('#university-ranking').click(function(){
        univ_th_ctgr = '';
        univ_th_crtr = '';
        univ_th_sort = '';
        var table_body = '';
        // let universities = [];
        jQuery('#ranking__subject_subj-selection, #ranking__subject_univ-selection, #ranking__subject-table, #ranking__university-table').hide();
		jQuery('#ranking__university_univ-selection, #step-2').hide().animate({opacity:'show'}, 500);
        let url = '/api/rank/university';
        let data = {

        };
        ajax_request(false, true, "GET", "json", url, data, null, all_universities_success_callback, error_callback);
		get_all_category('university');
		


		
		$('.loader-img').fadeIn(200).delay(800).animate({height:"hide"},300);
		setTimeout(function(){
			set_table_title();
		},300);
		function set_table_title(){
    		var containerWidth = $('.rank_table').width();
            var num_of_ctgr = 5;
		    let univ_width = 350;
    		let rank_width = 63;
	    	let number_of_crtr = 3;
            univ_th_ctgr =`<th rowspan="2" style="width:${rank_width}px">Thứ hạng</th><th class='rank__univ_table-category-h' rowspan="2" style='width:${univ_width}px'>Trường</th>`;
            var ctgr_width = (containerWidth-rank_width-univ_width)/num_of_ctgr;
	    	univ_th_sort = '<th></th><th></th>';
		    $.each(univ_ctgrCrtr, function(ctgr_index, ctgr){
			    let colspan = Object.keys(ctgr.criteria).length;
			    let category = ctgr.category;
			    univ_th_ctgr += `<th class="comp__univ_table-category comp__univ_table-ctgr-${category.id}" colspan="${number_of_crtr}">${category.name}</th> `;
			    let crtrs = ctgr.criteria;
			    $.each(crtrs, function(crtr_index, crtr){
				    if(crtr_index <= number_of_crtr - 1){
					    univ_th_crtr += `<th class="comp__univ_table-criterion comp__univ_table-${category.id}-cr" criterion-id="${crtr.id}">${crtr.name}</th>`;
					    univ_th_sort += '<th> </th>';
				    }
		    	});
            });
            
		}	




		// $('#rank-subj-multiselect option:selected').each(function(index){
        //     let tmp = $(this).text();
        //     let id = $(this).val();
        //     subj_table_th += `<th class="rank__subj_table-${id}-h rank__subj_table-uni-h" style="width:${univ_width}px">` + tmp + '</th>';
		// 	scores_list_for_subject_ranking(parseInt(id));
        // });
        setTimeout(function() {   
			$('#university_table_th-ctgr').html(univ_th_ctgr);
			$('#university_table_th-crtr').html(univ_th_crtr);
			$('#university_table_th-sort').html(univ_th_sort);
        }, 400);

		$($(this).attr('show')).animate({opacity:"show"},1000);
        $('html, body').animate({scrollTop:$($(this).attr('show')).offset().top - 104}, 1000);
        


    });
    
    var subj_table_th ="";
    var subj_ctgrCrtr = [];
    var ctgr_with_criterions = [];
    var scores = [];
    var score_list = new Array();
    var crtr_width =171;
    // jQuery("#ranking__subject-btn").click(function(){
    // 	// jQuery('#DataTables_Table_0_length label').contents().first()[0].textContent="Số trường trên bảng: ";
    // 	// jQuery('#DataTables_Table_0_length label').contents().last()[0].textContent=" trường."
    // 	// jQuery('#DataTables_Table_0_filter label').contents().first()[0].textContent="Tìm kiếm: ";
    // 	// jQuery('a[data-dt-idx="0"]').text("Trang trước");
    // 	// jQuery('a[data-dt-idx="8"]').text("Trang sau");
    // 	// let Info = jQuery("#DataTables_Table_0_info");
    // 	// Info.html(Info.html().replace("Showing", "Đang thể hiện trên bảng từ trường số "));
    // 	// Info.html(Info.html().replace("to", " tới trường số "));
    // 	// Info.html(Info.html().replace("of", " trên tổng số "));
    // 	// Info.html(Info.html().replace("entries", " trường."));
    //     // alert($('#rank-subj-multiselect option:selected').length);
        

    //     $('.loader-img').fadeIn(200).delay(800).animate({height:"hide"},300);
    //     var containerWidth = $('.rank_table').width();
    //     var num_of_ctgr = 4;//$('#rank-subj-multiselect :selected').length;
    //     letuniv_width = 200;
    //     subj_table_th =`<th class='rank__subj_table-category-h' rowspan="2" style='width:${univ_width}px'>Nhóm tiêu chí</th>`;
    //     // var table_tbody = "";
    //     // scores = []; scores_index = 0; score_lisvar ctgr_width = (containerWidth-univ_width)/num_of_ctgr;
	// 	var ctgr_width = (containerWidth-univ_width)/num_of_ctgr;
	// 	console.log(subj_ctgrCrtr);

	// 	$('#rank-subj-multiselect option:selected').each(function(index){
    //         let tmp = $(this).text();
    //         let id = $(this).val();
    //         subj_table_th += `<th class="rank__subj_table-${id}-h rank__subj_table-uni-h" style="width:${univ_width}px">` + tmp + '</th>';
	// 		scores_list_for_subject_ranking(parseInt(id));
    //     });
    //     setTimeout(function() {   
    //         $('#ranking__subject_table-th').html(subj_table_th);                
    //     }, 300);

	// 	$($(this).attr('show')).animate({opacity:"show"},1000);
    //     $('html, body').animate({scrollTop:$($(this).attr('show')).offset().top - 104}, 1000);
            
        
    //         // $('html, body').animate({scrollTop:$('#ranking__subject_univ-selection').offset().top - 70}, 200);
    //         // $(".notification").hide();
    //         // $(".notification").html("<p class='my-2 mx-4'>Bạn phải chọn ít nhất 2 trường Đại học để so sánh!</p>");
    //         // $(".notification").animate({height: "show"}).delay(2000).animate({height: "hide"});   
    //         // $($(this).attr('show')).hide();
        
    // });

    var groups_list;
    var univ_table_th = ""; var univ_ctgrCrtr = [];
    // jQuery(document).on('click', '#ranking__university-btn', function(){
    //     if($('#rank-univ-multiselect option:selected').length > 1){
    //         $('.loader-img').fadeIn(200).delay(800).animate({height: "hide"}, 300);
    //         var containerWidth = $('.rank_table').width();
    //         var num_of_ctgr = $('#rank-univ-multiselect :selected').length;
    //         univ_width = 161;crtr_width = 171;
    //         univ_table_th =`<th class='rank__univ_table-category-h' style='width:${univ_width}px'>Nhóm tiêu chí</th><th class='rank__univ_table-criterion-h' style='width:${crtr_width}px'>Tiêu chí</th>`;
    //         // var table_tbody = "";
    //         var univ_width = (containerWidth-univ_width)/num_of_ctgr;
			
			
			
	// 		$('#rank-univ-multiselect option:selected').each(function(){
    //             let tmp = $(this).text();
    //             let id = $(this).val();
    //             univ_table_th += `<th class="rank__univ_table-${id}-h rank__univ_table-uni-h" style="width:${univ_width}px">` + tmp + '</th>';
    //             scores_list_for_university_ranking(parseInt(id));
    //         });
    //         setTimeout( function(){
    //             $('#ranking__university_table-th').html(univ_table_th);
    //         }, 300);

    //         $($(this).attr('show')).animate({opacity:"show"},300);
    //         $('html, body').animate({scrollTop:$($(this).attr('show')).offset().top - 104}, 400);
    //     }
    //     else{
    //         $('html, body').animate({scrollTop:$('#ranking__university_univ-selection').offset().top - 70}, 200);
    //         $(".notification").hide();
    //         $(".notification").html("<p class='my-2 mx-4'>Bạn phải chọn ít nhất 2 trường Đại học để so sánh!</p>");
    //         $(".notification").animate({height: "show"}).delay(2000).animate({height: "hide"});
    //         $($(this).attr('show')).hide();   
    //     }
    // });
    jQuery(document).on('click', '.gs1-btn', function(){
    	jQuery('#ranking__subject_univ-selection').hide();
    	jQuery('.gs1-btn').removeClass('btn-select');
    	$('.gs1-btn').find($('.fa')).removeClass('fa-check');
    	jQuery(this).addClass('btn-select');
    	$(this).find($('.fa')).addClass('fa-check');
    	let sector_id = $(this).attr('id-gs1');
    	$('#subject-area').html('<div class="alert alert-warning mx-auto mt-3">Bạn chưa chọn nhóm ngành</div>');
    	// update_sector_choice(sector_id);
        let url = `/api/sectors/${sector_id}/subjects`;
        ajax_request(false, true, "GET", "json", url, null, null, group_success_callback, error_callback);
    });
    jQuery(document).on('click', '.gs2-btn', function(){
    	jQuery('#ranking__subject_univ-selection').hide();
    	jQuery('.gs2-btn').removeClass("btn-select");
    	$('.gs2-btn').find($('.fa')).removeClass('fa-check');
    	jQuery(this).addClass('btn-select');
    	$(this).find($('.fa')).addClass('fa-check');
    	let group_id = $(this).attr('id-gs2');
    	// update_group_choice(group_id);
        let subject_list = jQuery(groups_list).filter(function(index, entry){
            if(entry.id == group_id) return entry;
        });
        subjects_list_of_group(subject_list[0].subjects);
    });
    jQuery(document).on('click', '.subject-btn', function(){
		
    	jQuery('.subject-btn').removeClass('btn-select');
    	jQuery(this).addClass('btn-select');
    	$('.subject-btn').find($('.fa')).removeClass('fa-check');
    	$(this).find($('.fa')).addClass('fa-check');
    	let subjectName = $(this).attr('subject-name');
        $('#c-s-tit-31').text('Chọn trường ngành ' + subjectName);
        $('#ranking__subject_table-title').text('So sánh ngành ' + subjectName);
        let subject_selected_id = parseInt($(this).attr('subject-id'));
        let url = `/api/rank/subject/${subject_selected_id}`;
        let data = {
            // subject : subject_selected_id,
            // subject : 1,
		};
		var subj_th_ctgr = '';
		var subj_th_crtr = '';
		var subj_th_sort = '';
        ajax_request(false, true, "GET", "json", url, null, data, universities_success_callback , error_callback);
	
		

		// jQuery('#DataTables_Table_0_length label').contents().first()[0].textContent="Số trường trên bảng: ";
    	// jQuery('#DataTables_Table_0_length label').contents().last()[0].textContent=" trường."
    	// jQuery('#DataTables_Table_0_filter label').contents().first()[0].textContent="Tìm kiếm: ";
    	// jQuery('a[data-dt-idx="0"]').text("Trang trước");
    	// jQuery('a[data-dt-idx="8"]').text("Trang sau");
    	// let Info = jQuery("#DataTables_Table_0_info");
    	// Info.html(Info.html().replace("Showing", "Đang thể hiện trên bảng từ trường số "));
    	// Info.html(Info.html().replace("to", " tới trường số "));
    	// Info.html(Info.html().replace("of", " trên tổng số "));
    	// Info.html(Info.html().replace("entries", " trường."));
        // alert($('#rank-subj-multiselect option:selected').length);
        

        $('.loader-img').fadeIn(200).delay(800).animate({height:"hide"},300);
        var containerWidth = $('.rank_table').width();
		var num_of_ctgr = 4;
		var num_of_crtr = 4;//$('#rank-subj-multiselect :selected').length;
		let univ_width = 350;
		let rank_width = 63;
        subj_th_ctgr =`<th rowspan="2" style="width:${rank_width}px">Thứ hạng</th><th class='rank__subj_table-category-h' rowspan="2" style='width:${univ_width}px'>Trường</th>`;
        var ctgr_width = (containerWidth-univ_width)/num_of_ctgr;
		subj_th_sort = '<th></th><th></th>';
		$.each(subj_ctgrCrtr, function(ctgr_index, ctgr){
			let colspan = Object.keys(ctgr.criteria).length;
			let category = ctgr.category;
			subj_th_ctgr += `<th class="comp__subj_table-category comp__subj_table-ctgr-${category.id}" colspan="${num_of_crtr}">${category.name}</th> `;
			let crtrs = ctgr.criteria;
			$.each(crtrs, function(crtr_index, crtr){
				if(crtr_index <= num_of_crtr - 1){
					subj_th_crtr += `<th class="comp__subj_table-criterion comp__subj_table-${category.id}-cr">${crtr.name}</th>`;
					subj_th_sort += '<th> </th>'
				}
			});
		});





		// $('#rank-subj-multiselect option:selected').each(function(index){
        //     let tmp = $(this).text();
        //     let id = $(this).val();
        //     subj_table_th += `<th class="rank__subj_table-${id}-h rank__subj_table-uni-h" style="width:${univ_width}px">` + tmp + '</th>';
		// 	scores_list_for_subject_ranking(parseInt(id));
        // });
        setTimeout(function() {   
			$('#subject_table_th-ctgr').html(subj_th_ctgr);
			$('#subject_table_th-crtr').html(subj_th_crtr);
			$('#subject_table_th-sort').html(subj_th_sort);
        }, 300);

		$($(this).attr('show')).animate({opacity:"show"},1000);
        $('html, body').animate({scrollTop:$($(this).attr('show')).offset().top - 104}, 1000);
            
        
            // $('html, body').animate({scrollTop:$('#ranking__subject_univ-selection').offset().top - 70}, 200);
            // $(".notification").hide();
            // $(".notification").html("<p class='my-2 mx-4'>Bạn phải chọn ít nhất 2 trường Đại học để so sánh!</p>");
            // $(".notification").animate({height: "show"}).delay(2000).animate({height: "hide"});   
            // $($(this).attr('show')).hide();
        
    


	
	
	});
    // jQuery(document).on('click', '.gs-btn', function(){
    	
    //     subj_table_th ="<th>Nhóm tiêu chí</th><th>Tiêu chí</th>";
    // });
    function error_callback(response){
    	alert("Đã xảy ra lỗi, xem response tại console");
    }
    
    function group_success_callback(response){
    	
        let groups = response.groups; groups_list = groups;
        let pane = "";
        $.each(groups, function(index, group){
           pane += `<div class="col-md-4"><a href="#" show="#ranking__subject_subj-selection" class="btn gs-btn gs2-btn go-to-id" id="gs-2-${group.id}" id-gs2="${group.id}">${group.name}<i class="fa mt-1" style="float:right"></i></a></div>`; 
       });
        $('#gs2-area').html(pane);
        $('#tab1, #groupSubject-1').removeClass('active');
        $('#tab2').addClass('active');
        $('#groupSubject-2').removeClass('fade');
        $('#groupSubject-2').addClass('active');

    }

    // function update_group_   choice(group_id){
    //     let url = "/api/allSubjects";
    //     ajax_request(false, true, "GET", "json", url, null, null, subject_success_callback, error_callback);
    // }
    function subjects_list_of_group(subjects){
    	let pane = "";
        $.each(subjects, function(index, subject){
            pane += `<div class="col-md-4"><a show="#ranking__subject-table" href="#" class="btn gs-btn subject-btn go-to-id" id="subject-${subject.id}" subject-name="${subject.name}" subject-id="${subject.id}">${subject.name}<i class="fa mt-1" style="float:right"></i></a></div>`;
        });
        $('#subject-area').html(pane);
        $('#tab2, #groupSubject-2').removeClass('active');
        $('#tab3').addClass('active');
        $('#subject').removeClass('fade');
        $('#subject').addClass('active');
    };
    // function get_university_list(){
    // 	let url = "/api/allUniversity";
    // 	ajax_request(false, true,  "GET", 'json', url, null, null, all_universities_success_callback, error_callback);
    // }
    function universities_success_callback(response){
        let universities = response;
        
        $.each(universities, function(index, university){
            table_body += `<tr><td>1</td><td>${university.name}</td>`;
            scores_list_for_subject_ranking(parseInt(university.id)); 
        });
        

    };

    function all_universities_success_callback(response){
        let universities = response;
        $.each(universities, function(index, university){
            table_body += `<tr><td>1</td><td>${university.name}</td>`;
            scores_list_for_university_ranking(parseInt(university.id));
        });
        
        $('#rank-univ-multiselect').html(pane);
        $('#rank-univ-multiselect').chosen({max_selected_options: 5});
        $('.search-choice, .university__selected-box p').remove();
        $('#rank-univ-multiselect').trigger('chosen:updated');
        $('#rank-univ-multiselect').bind("chosen:maxselected", function(){
            $('.notification').html('<p class="mx-4 my-2">Bạn đã chọn đủ số trường tối đa là 5 trường</p>');
            $('.notification').animate({height: "show"}).delay(2000).animate({height: "hide"});
        });
    };
    var selected_univ = [];
    
    $(document).on("change", "#rank-subj-multiselect", function(){
        selected_univ = [];
        // $('#ranking__subject-table').hide();
        // let univ_name = "";
        $("#rank-subj-multiselect option:selected").each(function(){
            let univ_name = $(this).attr('univ-name');
            let univ_id = $(this).val();
            let data = {
                id : univ_id,
                name : univ_name,
            };
            selected_univ.push(data);
            
        });
        
        let li_count = $("#rank_subj_multiselect_chosen .chosen-choices").find("li").length;
        let last_select_univ = $('#rank_subj_multiselect_chosen .chosen-choices').find('li').eq(li_count - 2).find('span').text();
        $(".notification").hide();
        $(".notification").html("<p class='my-2 mx-4'>Đã thêm " + last_select_univ + " để so sánh!</p>");
        $(".notification").animate({height: "show"}).delay(2000).animate({height: "hide"});
        let univ_box = '';
        $.each(selected_univ, function(index, university){  
            univ_box += `<p class="my-1 ml-0 mr-lg-4"><i title="Xóa khỏi danh sách" class="fa fa-remove subject__remove-univ" target="${university.id}" target-name="${university.name}"></i> ${university.name}</p>`;
        });
        $(".subject__selected-box").html(univ_box);
        // $('[data-toggle="tooltip"]').tooltip();







    });
    $(document).on("change", "#rank-univ-multiselect", function(){
        selected_univ = [];
        $('#rank-univ-multiselect option:selected').each(function(){
            let univ_name = $(this).attr('univ-name');
            let univ_id = $(this).val();
            let data = {
                id: univ_id,
                name: univ_name,
            };
            selected_univ.push(data);
        });
        let li_count = $("#rank_univ_multiselect_chosen .chosen-choices").find("li").length;
        let last_select_univ = $('#rank_univ_multiselect_chosen .chosen-choices').find('li').eq(li_count - 2).find('span').text();
        $(".notification").html('<p class="my-2 mx-4">Đã thêm ' + last_select_univ + ' để so sánh!</p>');
        $(".notification").animate({height: "show"}).delay(2000).animate({heigth: "hide"});
        let univ_box = "";
        $.each(selected_univ, function(index, university){
            univ_box += `<p class="my-1 ml-0 mr-xl-4"><i title="Xóa khỏi danh sách" class="fa fa-remove university__remove-univ" target="${university.id}" target-name="${university.name}"></i> ${university.name}</p>`;
        });
        $('.university__selected-box').html(univ_box);
    });

    $(document).on("click", ".subject__remove-univ", function(){
        let id = $(this).attr('target');
        let name = $(this).attr('target-name');
        let values = $('#rank-subj-multiselect').val();
        if(values){
            let i = values.indexOf(id);
            if(i >= 0){
                values.splice(i, 1);
                $('#rank-subj-multiselect').val(values).change();
            }
        }
        
        // let data_index = $(this).attr('index'); alert(data_index);
        $(".notification").html("<p class='my-2 mx-4'>Đã xóa " + name + " khỏi danh sách so sánh!");
        // alert(`li:contains("${name}")`);
        // $(`li[data-option-array-index="${data_index}"]`).removeClass('result-selected').addClass('active-result');
        $('#rank-subj-multiselect').trigger("chosen:updated");
    });
    $(document).on('click', '.university__remove-univ', function(){
        let id = $(this).attr('target');
        let name = $(this).attr('target-name');
        let values = $('#rank-univ-multiselect').val();
        if(values){
            let i = values.indexOf(id);
            if(i >= 0){
                values.splice(i, 1);
                $('#rank-univ-multiselect').val(values).change();
            }
        }
        $(".notification").html('<p class="my-2 mx-4"> Đã xóa ' + name + ' khỏi danh sách so sánh!');
        $("#rank-univ-multiselect").trigger("chosen:updated");
    });

    function get_all_sector(){
        let url = "/api/sectors";
        ajax_request(false, true, "GET", "json", url, null, null, all_sectors_success_callback, error_callback);
    };
    function all_sectors_success_callback(response){
        let sectors = response.sectors;
        let pane = "";
        $.each(sectors, function(index, sector){
            pane += `<div class="col-md-4"><a show="#ranking__subject_subj-selection" class="btn gs-btn gs1-btn go-to-id" href="#" id-gs1="${sector.id}">${sector.name}<i class="fa mt-1" style="float:right"></i></a></div>`;
        });
        $("#gs1-area").html(pane);

    }

    function get_all_category(target){
        let url = "/api/criteria";
        let data = {
            target : target,
        };
        if(target == "subject"){
            ajax_request(false, true, "GET", "json", url, null, data, all_category_subject_callback, error_callback);
        }
        else if(target == "university"){
            ajax_request(false, true, "GET", "json", url, null, data, all_category_university_callback, error_callback);
        }
    }
    function all_category_subject_callback(response){
        let categories = response;
        subj_ctgrCrtr = categories;
        
    }
    function all_category_university_callback(response){
        univ_ctgrCrtr = response;
    }
    
    function scores_list_for_subject_ranking(university_id){
        let uni_id = university_id;
        let url = `/api/universities/${uni_id}/scores`;
        let data = {
            university_id : university_id,
        };
        ajax_request(false, true, "GET", "json", url, null, data, score_list_subject_ranking_success_callback, error_callback);
    }
	var scores_index = 0;
	function score_list_subject_ranking_success_callback(response){
        response_id = response.university_id;
        // let table_tbody = "";
		score_list[`${response_id}`] = response.score;
		
        
	}

	function scores_list_for_university_ranking(university_id){
        let uni_id = university_id;
        let url = `/api/universities/${uni_id}/scores`;
        let data = {
            university_id : university_id,
        };
        ajax_request(false, true, "GET", "json", url, null, data, score_list_university_ranking_success_callback, error_callback);
    }
    // var scores_index = 0;
    function score_list_university_ranking_success_callback(response){
        response_id = response.university_id;
        
        score_list[`${response_id}`] = response.score;
        
	
	
	}




});