import Vue from "vue";

import * as localForage from "localforage";
import themes from "@/assets/default-themes.json";
import blockPacks from "@/assets/default-blockpacks.json";

export const state = new Vue({
    methods: {
        async importDocument(doc) {
            let user = await localForage.getItem("user");
            //User exists?
            if (user == null || user == undefined) {
                return false;
            }

            user.documents.push(doc)
            await localForage.setItem("user", user);

            //Load into memory
            this.user = user
            return user.documents.length - 1
        },
        async deleteBlock(index) {
            let user = await localForage.getItem("user");
            let data = await localForage.getItem("data");
            //User exists?
            if (user == null || user == undefined) {
                return false;
            }
            if (data == null || user == undefined) {
                return false;
            }
            data.blockPacks = data.blockPacks.filter((d, i) => i !== index);
            await localForage.setItem("data", data);

            //Load into memory

            user.data = data;
            this.user = user;
            const newBlocks = [];
            data.blockPacks.forEach(b => newBlocks.push(...b.blocks));
            this.blocks = newBlocks

            return true;
        },
        async createDocument() {
            let user = await localForage.getItem("user");
            let data = await localForage.getItem("data");
            //User exists?
            if (user == null || user == undefined) {
                return false;
            }
            if (data == null || user == undefined) {
                return false;
            }

            user.documents.push({ metadata: { title: "  Document" }, content: [] })
            await localForage.setItem("user", user);

            //Load into memory
            this.user = user
            return user.documents.length - 1
        },
        async installBlockPack(blockPack) {
            let user = await localForage.getItem("user");
            let data = await localForage.getItem("data");

            //Make sure they have a user init
            if (user == null || data == null) {
                return false;
            }

            //Confirm it exists
            if (blockPack == null || blockPack == undefined) {
                return false;
            }

            //Make sure they don't install the same 
            if (data.blockPacks.find(bp => bp.name == blockPack.name) !== undefined) {
                return false;
            }

            data.blockPacks.push(blockPack);
            await localForage.setItem("data", data);
            //Load everything into memory
            user.data = data;
            this.user = user;
            this.themes = data.themes;
            const newBlocks = [];
            data.blockPacks.forEach(b => newBlocks.push(...b.blocks));
            this.blocks = newBlocks;
            return true;
        },
        async deleteTheme(index) {
          let user = await localForage.getItem("user");
          let data = await localForage.getItem("data");

          //Make sure they have a user init
          if (user == null || user == undefined) {
              return false;
          }
          if (data == null || data == undefined) {
            return false;
        }

          //Confirm it exists
          if (data.themes[index] == undefined) {
              return false;
          }
          data.themes = data.themes.filter((d, i) => i !== index);
          await localForage.setItem("data", data);


          //Load everything into memory
           user.data = data;
           this.user = user;
           this.themes = data.themes;
           return true;
      },
        async deleteDocument(index) {
            let user = await localForage.getItem("user");

            //Make sure they have a user init
            if (user == null || user == undefined) {
                return false;
            }

            //Confirm it exists
            if (user.documents[index] == undefined) {
                return false;
            }
            user.documents = user.documents.filter((d, i) => i !== index);
            await localForage.setItem("user", user);


            //Load everything into memory
            this.user = user;
            return true;
        },
        async installTheme(theme) {
            let user = await localForage.getItem("user");
            let data = await localForage.getItem("data");

            //Make sure they have a user init
            if (user == null || data == null) {
                return false;
            }

            //Confirm it exists
            if (theme == null || theme == undefined) {
                return false;
            }
            //Make sure they have a user init
            if (user == null || data == null) {
                return false;
            }

            //Confirm it exists
            if (theme == null || theme == undefined) {
                return false;
            }

            //Make sure they don't install the same 
            if (data.themes.find(t => t.name == theme.name) !== undefined) {
                return false;
            }


            data.themes.push(theme);
            await localForage.setItem("data", data);

            //Load everything into memory
            user.data = data;
            this.user = user;
            this.themes = data.themes;
            this.blocks = [].concat.apply(
                [],
                data.blockPacks.map(b => b.blocks)
            );
            return true;
        },
        async installBlockPack(blockPack) {
            let user = await localForage.getItem("user");
            let data = await localForage.getItem("data");

            //Make sure they have a user init
            if (user == null || data == null) {
                return false;
            }

            //Confirm it exists
            if (blockPack == null || blockPack == undefined) {
                return false;
            }

            //Make sure they don't install the same 
            if (data.blockPacks.find(bp => bp == blockPack) !== undefined) {
                return false;
            }

            data.blockPacks.push(blockPack);
            await localForage.setItem("data", data);
            //Load everything into memory
            user.data = data;
            this.user = user;
            this.themes = data.themes;
            const newBlocks = [];
            data.blockPacks.forEach(b => newBlocks.push(...b.blocks));
            this.blocks = newBlocks;

            console.log(
                [].concat.apply(
                    [],
                    data.blockPacks.map(b => b.blocks)
                )
            );
            return true;
        },
        async getUser() {
            let user = await localForage.getItem("user");
            let data = await localForage.getItem("data");

            //Create user if not made
            if (user == null) {
                user = {
                    documents: [{metadata:{title:"Demo Document"},content:[]}]
                };
                await localForage.setItem("user", user);
            }
            //Add default data
            if (data == null) {
                data = {
                    themes: themes,
                    blockPacks: blockPacks,
                    extentions: []
                };
                await localForage.setItem("data", data);
            }

            //Load everything into memory
            user.data = data;
            this.user = user;
            this.themes = data.themes;
            const newBlocks = [];
            data.blockPacks.forEach(b => newBlocks.push(...b.blocks));
            this.blocks = newBlocks

            return user;
        },
        async selectDoc() {
            if (state.selectedDocument == null) {
                //prompt user to choose a doc
            } else {
                state.document = this.user.documents[state.selectedDocument];
            }
        },
        async saveDoc(index = 0) {
            this.user.documents[state.selectedDocument] = this.document;
            let save = localForage.setItem("user", this.user);
            return save;
        }
    },
    data: {
        blocks: [],
        document: {
            metadata: {
                title: "Loading.."
            },
            content: []
        },
        selected: null,
        user: null,
        typeIndex: 0,
        currentBlockIndex: null,
        special: null,
        selectedDocument: 0,
        selectionIndex: {
            blockIndex: null,
            typeIndex: null
        },
        menus: {
            selectedBlock: null,
            export: false
        },
        themes: [],
        settings: {
            borders: false,
            templateOpen: false,
            box: false,
            tooltip: false
        }
    },
    watch: {
        document: {
            deep: true,
            handler() {
                this.saveDoc();
            }
        }
    }
});

export default state;