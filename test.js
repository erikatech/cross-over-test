/*'use strict';

var FileTreeNode = function(nodeId, name, type) {
    var children = [];

    this.nodeId = nodeId;
    this.name = name;
    this.type = type;
    this.parentNode = null;

    this.setParent = function(parentNode) {
        this.parentNode = parentNode;
    };


    this.addChild = function(node){
        if (this.type !== 'DIRECTORY') {
            throw "Cannot add child node to a non-directory node";
        }
        children.push(node);
        node.setParent(this);
    };
    this.getChildren = function() {
        return children;
    };
};

var FileTree = function() {
    this.nodes = [];

    this.getRootNodes = function() {
        var result = [];
        for (var i=0; i < this.nodes.length; i++) {
            if (!this.nodes[i].parentNode) {
                result.push(this.nodes[i]);
            }
        }
        return result;
    };

    this.findNodeById = function(nodeId) {
        for (var i=0; i < this.nodes.length; i++) {
            if (this.nodes[i].nodeId === nodeId) {
                return this.nodes[i];
            }
        }
        return null;
    };


    this.createNode = function(nodeId, name, type, parentNode) {
        var node = new FileTreeNode(nodeId, name, type);
        if (parentNode) {
            parentNode.addChild(node);
        }
        this.nodes.push(node);
    };
};

function createFileTree(input) {

    var fileTree = new FileTree();

    for (var it=0; it < input.length; it++) {
        var inputNode = input[it];
        var parentNode = inputNode.parentId ? fileTree.findNodeById(inputNode.parentId) : null;
        fileTree.createNode(inputNode.id, inputNode.name, inputNode.type,  parentNode);
    }

    return fileTree;
}*/

//-------------------------------------------------------------------- MINE
'use strict';

var FileTreeNode = function(nodeId, name, type) {
    var children = [];

    this.nodeId = nodeId;
    this.name = name;
    this.type = type;
    this.parentNode = null;

    this.setParent = function(parentNode) {
        this.parentNode = parentNode;
    };

    this.addChild = function(node){
        if (this.type !== 'DIRECTORY') {
            throw "Cannot add child node to a non-directory node";
        }
        children.push(node);
        node.setParent(this);
    };
    this.getChildren = function() {
        return children;
    };
};

var FileTree = function() {
    this.nodes = [];

    this.getRootNodes = function() {
        var result = [];
        for (var i=0; i < this.nodes.length; i++) {
            if (!this.nodes[i].parentNode) {
                result.push(this.nodes[i]);
            }
        }
        return result;
    };

    /**
     * In the previous version, we were looking up the parentNode inside [this.nodes]
     * However sometimes the parent node hasn't being added to the local array of nodes yet.
     * My solution then was:
     *  we should pass the original files [the user input] to this function, so we can look up
     *    for the parent node. If we find it we return a new FileTreeNode, passing the foundNode information
     * In that way, we can always find the parentNode, independently of the position it occupies in the original array
     * @param nodeId
     * @param files
     * @returns {*}
     */
    this.findNodeById = function(nodeId, files) {
        for (var i=0; i < files.length; i++) {
            if (files[i].id === nodeId) {
                var foundNode = files[i];
                return new FileTreeNode(foundNode.id, foundNode.name, foundNode.type, null);
            }
        }
        return null;
    };


    this.createNode = function(nodeId, name, type, parentNode) {
        var node = new FileTreeNode(nodeId, name, type);
        if (parentNode) {
            parentNode.addChild(node);
        }
        this.nodes.push(node);
    };
};

function createFileTree(input) {

    var fileTree = new FileTree();

    for (var it=0; it < input.length; it++) {
        var inputNode = input[it];
        var parentNode = inputNode.parentId ? fileTree.findNodeById(inputNode.parentId, input) : null;
        fileTree.createNode(inputNode.id, inputNode.name, inputNode.type,  parentNode);
    }

    return fileTree;
}
