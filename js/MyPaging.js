; (function ($, window, document) {
    function MyPaging(el, opt) {
    this.oPagingParent = $(el); this.total = 0; this.totalPage = 0; this.linkNum = opt.linkNum || 5; this.current = opt.current || 1; this.size = opt.size || 10; this.sizes = opt.sizes || [10, 20, 50, 100, 200]; this.prevHtml = opt.prevHtml || '&lt;'; this.nextHtml = opt.nextHtml || '&gt;'; this.layout = ['total', 'prev', 'pager', 'next', 'jumper']; if (opt.layout) { this.layout = opt.layout.split(','); }
        if (!opt.jump) { return; }
        this.jump = opt.jump; this._init();
    }
    var prototype = {
        _init: function () { this.jump(); }, setCurrent: function (data) {
            if (data > 0 && data <= this.totalPage) { this.current = data; } else { this.current = 1; }
            this.jump();
        }, setTotal: function (data) { if (data >= 0) { this.total = data; this.totalPage = Math.ceil(this.total / this.size); this._setPagingHtml(); } }, _setPagingHtml: function () {
            var html = '<div class="_my-paging-box">'; if (this.totalPage > 0) {
                for (var iKey = 0; iKey < this.layout.length; iKey++) {
                    var key = this.layout[iKey].replace(/\s/g, ''); if (key == 'total') { html += '<div class="total pg-item">共<span>' + this.total + '</span>条</div>'; }
                    if (key == 'totalPage') { html += '<div class="total-page pg-item">共<span>' + this.totalPage + '</span>页</div>' }
                    if (key == 'sizes') {
                        html += '<select class="sizes pg-item">'; for (var i = 0; i < this.sizes.length; i++) { html += '<option value="' + this.sizes[i] + '"' + (this.size == this.sizes[i] ? ' selected' : '') + '>' + this.sizes[i] + '条/页</option>'; }
                        html += '</select>';
                    }
                    if (key == 'prev') { html += '<div class="link-btn prev pg-item' + (this.current == 1 ? ' disabled' : '') + '" data-current="prev">' + this.prevHtml + '</div>'; }
                    if (key == 'pager') {
                        html += '<ul class="link-list pg-item">'; var start = end = 0; var sPager = ''
                        if (this.totalPage <= this.linkNum) { start = 1; end = this.totalPage; for (var i = 1; i <= this.totalPage; i++) { sPager += '<li class="link-btn' + (this.current == i ? ' active' : '') + '" data-current="' + i + '">' + i + '</li>'; } } else if (this.current < Math.ceil(this.linkNum / 2)) { start = 1; end = this.linkNum; for (var i = 1; i <= this.linkNum; i++) { sPager += '<li class="link-btn' + (this.current == i ? ' active' : '') + '" data-current="' + i + '">' + i + '</li>'; } } else if (this.current > this.totalPage - Math.ceil(this.linkNum / 2)) { start = this.totalPage - this.linkNum + 1; end = this.totalPage; for (var i = this.totalPage - this.linkNum + 1; i <= this.totalPage; i++) { sPager += '<li class="link-btn' + (this.current == i ? ' active' : '') + '" data-current="' + i + '">' + i + '</li>'; } } else { start = this.current - Math.ceil(this.linkNum / 2) + 1; end = this.current - Math.ceil(this.linkNum / 2) + this.linkNum; for (var i = 1; i <= this.linkNum; i++) { var idx = this.current - Math.ceil(this.linkNum / 2) + i; sPager += '<li class="link-btn' + (this.current == idx ? ' active' : '') + '" data-current="' + idx + '">' + idx + '</li>'; } }
                        if (this.current > Math.ceil(this.linkNum / 2) && this.totalPage > this.linkNum) { html += '<li class="link-btn" data-current="1">1</li>'; if (start > 2) { html += '<li>···</li>'; } }
                        html += sPager; if (this.current <= this.totalPage - Math.ceil(this.linkNum / 2) && this.totalPage > this.linkNum) {
                            if (end < this.totalPage - 1) { html += '<li>···</li>'; }
                            html += '<li class="link-btn" data-current="' + this.totalPage + '">' + this.totalPage + '</li>';
                        }
                        html += '</ul>';
                    }
                    if (key == 'next') { html += '<div class="link-btn next pg-item' + (this.current == this.totalPage ? ' disabled' : '') + '" data-current="next">' + this.nextHtml + '</div>'; }
                    if (key == 'jumper') { html += '<div class="jumper pg-item"><span>前往</span><input type="text"><span>页</span></div>'; }
                }
            }
            html += '</div>'; this.oPagingParent.html(html); this._setPagingEvent();
        }, _setPagingEvent: function () {
            var _this = this; var oMyPaging = this.oPagingParent.find('._my-paging-box'); var oSizes = oMyPaging.find('.sizes'); var oLinkBtn = oMyPaging.find('.link-btn'); var oIpt = oMyPaging.find('.jumper input'); oSizes.on('change', function () { _this.size = $(this).val(); _this.setCurrent(1); })
            oLinkBtn.on('click', function () {
                var oTag = $(this); var current = oTag.data('current'); var to = _this.current; if (current == 'prev') { to = to > 1 ? to - 1 : 1; } else if (current == 'next') { to = to < _this.totalPage ? to + 1 : _this.totalPage; } else { to = current; }
                if (to == _this.current) { return; }
                _this.current = to; _this.jump();
            })
            oIpt.on('keydown', function (event) {
                var code = event.keyCode; if (code == 13) {
                    var to = $(this).val(); if (!(to >= 1 && to <= _this.totalPage)) { to = 1; }
                    _this.current = to; _this.jump();
                }
            })
        },
    }
    for (var i in prototype) { MyPaging.prototype[i] = prototype[i]; }
    window.MyPaging = MyPaging;
})(jQuery, window, document);