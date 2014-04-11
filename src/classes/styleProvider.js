﻿var ngStyleProvider = function($scope, grid) {
    $scope.headerCellStyle = function(col) {
        return { "height": col.headerRowHeight + "px" };
    };
    $scope.rowStyle = function (row) {
        //Find out highest cell height
        var rowHeight = $scope.rowHeight;
        var cols = row.elm.context.children.length;
        //Get highest row size
        for (var r = 0; r < cols; r++) {
            var newRowContentHeight = row.elm.context.children[r].children[1].offsetHeight;
            if (rowHeight < newRowContentHeight)
            rowHeight = newRowContentHeight;
        }
        //Fix offsetTop of next cell
        if (grid.rowCache[row.rowIndex + 1] != null)
            grid.rowCache[row.rowIndex + 1].clone.offsetTop = row.offsetTop + rowHeight;
        else //Fix grid height
            grid.$viewport[0].style.height = row.offsetTop + rowHeight + "px";
        var ret = { "top": row.offsetTop + "px", "height": rowHeight + "px" };
        if (row.isAggRow) {
            ret.left = row.offsetLeft;
        }
        return ret;
    };
    $scope.canvasStyle = function() {
        return { "height": grid.maxCanvasHt + "px" };
    };
    $scope.headerScrollerStyle = function() {
        return { "height": grid.config.headerRowHeight + "px" };
    };
    $scope.topPanelStyle = function() {
        return { "width": grid.rootDim.outerWidth + "px", "height": $scope.topPanelHeight() + "px" };
    };
    $scope.headerStyle = function() {
        return { "width": grid.rootDim.outerWidth + "px", "height": grid.config.headerRowHeight + "px" };
    };
    $scope.groupPanelStyle = function () {
        return { "width": grid.rootDim.outerWidth + "px", "height": "32px" };
    };
    $scope.viewportStyle = function() {
        return { "width": grid.rootDim.outerWidth + "px", "height": $scope.viewportDimHeight() + "px" };
    };
    $scope.footerStyle = function() {
        return { "width": grid.rootDim.outerWidth + "px", "height": $scope.footerRowHeight + "px" };
    };
};