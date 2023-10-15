import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { HelloAnchorHack } from "../target/types/hello_anchor_hack";

describe("hello-anchor-hack", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.HelloAnchorHack as Program<HelloAnchorHack>;

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods.initialize().rpc();
    console.log("Your transaction signature", tx);
  });

  it("Is initialized2!", async () => {
    // Add your test here.
    const tx = await program.methods.initialize2().rpc();
    console.log("Your transaction signature", tx);
  });
});

// import * as anchor from "@coral-xyz/anchor";
// import type { HelloAnchorHack } from "../target/types/hello_anchor_hack";

// // Configure the client to use the local cluster
// anchor.setProvider(anchor.AnchorProvider.env());

// const program = anchor.workspace.HelloAnchorHack as anchor.Program<HelloAnchorHack>;

// // Client code...
// console.log(program.programId.toString());

// const txHash = program.methods.initialize().rpc();
// console.log(txHash);
