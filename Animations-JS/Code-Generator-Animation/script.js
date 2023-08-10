(function () {

    var doc = document,
        elemList = Construct_SubElement_List(doc.body),
        len = elemList.length,
        win = window,
        i,
        The_Matrix;

    for (i = 0; i < len; i++) {

        var currElem = elemList[i];

        if (currElem.className && /^Block_The_Matrix_Viewport/.test(currElem.className)) {

            The_Matrix = new The_Matrix_Obj(currElem);
        }
    }
    function The_Matrix_Obj(ElemObjRef) {

        var ELEM = ElemObjRef, doc = document, win = window, span_EO = doc.createElement("span"), div_EO = doc.createElement("div"), docFrag = doc.createDocumentFragment(),

            ElemList = Construct_SubElement_List(ELEM), num = ElemList.length, j, k;

        this.ElemObj = ELEM;

        this.Cmd_Line_EO = "";
        this.Code_EO = "";
        this.Cursor_EO = "";

        this.Cmd_Typing = false;

        for (j = 0; j < num; j++) {

            var CE = ElemList[j];

            if (/^Command_Line_sB/.test(CE.className))

                this.Cmd_Line_EO = CE;

            else if (/^Matrix_Code_sB/.test(CE.className))

                this.Code_EO = CE;

            else if (/^blinking_cursor/.test(CE.className))

                this.Cursor_EO = CE;
        }

        this.Command_Line = function (cmdStr) {

            if (!this.Cmd_Typing) {

                this.Clear_HTML("cmd");

                this.Cmd_Line_EO.appendChild(Construct_Element_Object(span_EO.cloneNode(), [["className", "blinking_cursor"]], "", "", ""));
                this.Cmd_Line_EO.insertBefore(span_EO.cloneNode(), this.Cmd_Line_EO.firstChild);
                this.Cmd_Line_EO.firstChild.innerHTML = cmdStr.charAt(0);
                this.Cmd_Typing = true;

            } else {

                this.Cmd_Line_EO.firstChild.innerHTML += cmdStr.charAt(0);

                if (cmdStr.length == 1) {

                    this.Cmd_Typing = false;
                    return;
                }
            }
            win.setTimeout(function () { The_Matrix.Command_Line(cmdStr.substring(1)); }, 15);
        };

        this._Generate = function () {

            this.Clear_HTML("matrix");

            var numCols = 90, numRows = 80;

            for (j = 0; j < numCols; j++) {

                var colSpan = span_EO.cloneNode();

                for (k = 0; k < numRows; k++) {

                    if (Math.random() <= 0.25)

                        var child_EO = Construct_Element_Object(doc.createElement("b"), "", "", [doc.createTextNode(Math.floor(Math.random() * 10))], "");
                    else
                        var child_EO = doc.createTextNode(Math.floor(Math.random() * 10));

                    colSpan.appendChild(Construct_Element_Object(div_EO.cloneNode(), "", "", [child_EO], ""));
                }
                docFrag.appendChild(colSpan);
            }
            this.Code_EO.appendChild(docFrag);

            win.setTimeout(function () { The_Matrix._Generate(); }, 600);
        };

        this.Clear_HTML = function (clearType) {

            if (clearType == "matrix")

                while (this.Code_EO.firstChild) this.Code_EO.removeChild(this.Code_EO.firstChild);

            else if (clearType == "cmd")

                while (this.Cmd_Line_EO.firstChild) this.Cmd_Line_EO.removeChild(this.Cmd_Line_EO.firstChild);
        };

        win.setTimeout(function () { The_Matrix.Command_Line("Call trans opt: received. 2-19-98 13:24:18 REC:Log>"); }, 500);
        win.setTimeout(function () { The_Matrix.Command_Line("Trace program: running"); }, 2500);
        win.setTimeout(function () { The_Matrix.Clear_HTML("cmd"); The_Matrix._Generate(); }, 3500);
        win.setTimeout(function () { The_Matrix.ElemObj.className = "Block_The_Matrix_Viewport"; }, 3600);
    }
    function Construct_Element_Object(elem, propertyArr, methodArr, childArr, innerHTML_CharStr) {

        var Elem_Obj = elem,

            Properties = propertyArr,

            Methods = methodArr,

            Children = childArr,

            inner_html = innerHTML_CharStr,

            len, i;

        len = Properties.length;

        for (i = 0; i < len; i++)		Elem_Obj[Properties[i][0]] = Properties[i][1];

        len = Methods.length;

        for (i = 0; i < len; i++)		Elem_Obj[Methods[i][0]] = Methods[i][1];

        len = Children.length;

        for (i = 0; i < len; i++)		Elem_Obj.appendChild(Children[i]);

        len = inner_html.length;

        if (len > 0) Elem_Obj.innerHTML = inner_html;

        return Elem_Obj;
    }
    function Construct_SubElement_List(ElemObjRef) {

        var _ELEM = ElemObjRef,

            tmpList = _ELEM.getElementsByTagName("*"), tmpLen = tmpList.length, k,

            ELEM_LIST = [];

        for (k = 0; k < tmpLen; k++)		ELEM_LIST.push(tmpList[k]);

        return ELEM_LIST;
    }
})();