// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CraftMine is ERC721, Ownable {
    uint256 public nextId = 1;
    mapping(uint256 => string) private _tokenURIs;

    constructor() ERC721("ChainCraftItem", "CCIT") {}

    function mint(string memory tokenURI) public returns (uint256) {
        uint256 tokenId = nextId++;
        _mint(msg.sender, tokenId);
        _tokenURIs[tokenId] = tokenURI;
        return tokenId;
    }

    function tokenURI(uint256 tokenId) public view returns (string memory) {
        require(_exists(tokenId), "Nonexistent token");
        return _tokenURIs[tokenId];
    }
}
