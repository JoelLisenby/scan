var scanner = function() {

	var s = this;

	s.init = function() {
		console.log('init scan');
		s.in_el = document.getElementById('url');
		s.url = s.in_el.value;
		var prefix = 'http://';
		if(!s.url.match(/^(http|https):\/\//)) {
			s.url = prefix + s.url;
			s.in_el.value = s.url;
		}
		s.out_el = document.getElementById('output');
		s.out_el.innerHTML = '<p><strong>Enter a URL then click Scan</strong></p>';
		if(s.getUrlParam('url')) {
			s.scan(s.url);
		}
	};

	s.scan = function(url) {
		console.log('scanning '+ url);
		s.out_el.innerHTML = '<p><strong>Scanning...</strong></p>';
		s.requestJSON('scan.php?url='+ encodeURIComponent(url),function() {
			s.scan_result = JSON.parse(this.responseText);
			console.log(s.scan_result);
			if(!s.scan_result.error) {
				s.printReport();
			} else {
				s.out_el.innerHTML = '<p><strong>Invalid URL</strong></p>';
			}
		});
	};

	s.printReport = function() {
		var html = '';
		for(var i = 0; i < s.scan_result.reportCategories.length; i++) {
			var report = s.scan_result.reportCategories[i];
			html += '<div class="report-categories">';
			html += '<h2>'+ report.name +'</h2>';
			html += '<div class="score">'+ Math.floor(report.score) +'</div>';
			//html += '<div class="description">'+ report.description +'</div>';
			html += '<ul class="audits">';
			for(var j = 0; j < report.audits.length; j++) {
				var audit = report.audits[j];
				if(!audit.result.score) {
					html += '<li class="audit"><strong>'+ audit.result.category +'</strong> - '+ s.escapeHTML( audit.result.description ) +'</li>';
				}
			}
			html == '</ul>';
			html += '</div>';
		}
		s.out_el.innerHTML = html;
	};

	s.requestJSON = function(url, loadCallback) {
		var oReq = new XMLHttpRequest();
		oReq.open("GET", url);
		oReq.send();
		oReq.addEventListener("load", loadCallback);	
	};

	s.escapeHTML = function(html) {
		return html.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
	};

	s.getUrlParam = function(name) {
		return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
	};

	s.init();

};

scanner();
