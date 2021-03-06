
// Partitions spacing constant
const spacing = 5;

function SetValues() {

    document.getElementById('memory-opt').value = 4;
    document.getElementById('partitions-opt').value = 1;
    document.getElementById('processes-opt').value = 1;
}

function AddPartition(memory_size, part_num){

    size = Math.floor(Math.random() * memory_size / 2) + 2;

    const memory = document.getElementById('memory');

    const part = document.createElement('div')
    part.className = 'part';
    part.id = 'cont-part-' + part_num;

    const mem_part = document.createElement('input');
    mem_part.className = 'mem-part';
    mem_part.type = 'text';
    mem_part.id = 'mem-part-' + part_num;
    mem_part.setAttribute("onchange", "UpdatePartSize(" + part_num + ")");
    mem_part.style.padding = (size * spacing) + 'px 0';
    mem_part.value = size;

    const proc_part = document.createElement('input');
    proc_part.className = 'proc-part';
    proc_part.type = 'text';
    proc_part.id = 'proc-part-' + part_num;
    proc_part.readOnly = true;
    proc_part.value = 0;

    part.appendChild(mem_part);
    part.appendChild(proc_part);
    memory.appendChild(part);

    return memory_size - size;
}

function UpdatePartSize(part_num) {

    const mem_part = document.getElementById('mem-part-' + part_num);
    mem_part_size = document.getElementById('mem-part-' + part_num).value;
    mem_part.style.padding = (mem_part_size * spacing) + 'px 0';
}

function UpdateProcSize(proc_num) {

    const proc = document.getElementById('proc-' + proc_num);
    proc_part_size = document.getElementById('proc-' + proc_num).value;
    proc.style.padding = (proc_part_size * spacing) + 'px 0';
}

function AddProcess(process_size, proc_num) {

    size = Math.floor(Math.random() * process_size / 2) + 2;

    const process_stack = document.getElementById('process-stack');

    const proc = document.createElement('div');
    proc.className = 'proc';

    const text_start = document.createTextNode('P' + proc_num + ': ');

    const proc_inp = document.createElement('input');
    proc_inp.type = 'text';
    proc_inp.id = 'proc-' + proc_num;
    proc_inp.style.padding = (size * spacing) + 'px 0';
    proc_inp.setAttribute("onchange", "UpdateProcSize(" + proc_num + ")");
    proc_inp.value = size;

    proc.appendChild(text_start);
    proc.appendChild(proc_inp);
    process_stack.appendChild(proc);

    return process_size - size;
}


function UpdateType(id) {

    SetValues();
    
    if(id == 'static-opt') {
        document.getElementById('partitions-opt').disabled = false;
        document.getElementById('nextfit').disabled = false;
        document.getElementById('bestfit').disabled = false;
        document.getElementById('worstfit').disabled = false;
        document.getElementById('memory').innerHTML = '';
    }
    else if (id == 'dynamic-opt') {
        // alert('hello');
        document.getElementById('partitions-opt').disabled = true;
        document.getElementById('nextfit').disabled = true;
        document.getElementById('bestfit').disabled = true;
        document.getElementById('worstfit').disabled = true;
        
        document.getElementById('memory').innerHTML = '';
    }
}

function UpdateMemory(id) {

    memory_size = document.getElementById(id).value;
    document.getElementById('memory-size').innerHTML = memory_size;
    document.getElementById('process-stack').innerHTML = '';
    document.getElementById('memory').innerHTML = '';

    let max_partition
    if(memory_size > 14) {
        max_partition = 7;
    }
    else {
        max_partition = memory_size / 2;
    }

    document.getElementById('processes-opt').max = max_partition;
    document.getElementById('process-max').innerHTML = max_partition;
    document.getElementById('partitions-opt').max = max_partition;
    document.getElementById('part-max').innerHTML = max_partition;

}

function UpdatePartitions(id) {

    partitions = document.getElementById(id).value;
    document.getElementById('memory').innerHTML = '';
    memory_size = document.getElementById('memory-size').innerHTML;
    max_part_size = memory_size / 2;

    for(i = 0; i < partitions; i++) {
        max_part_size = AddPartition(max_part_size, i + 1);
    }
}

function UpdateProcesses(id) {

    processes = document.getElementById(id).value;
    document.getElementById('num-of-processes').innerHTML = processes;
    document.getElementById('process-stack').innerHTML = '';
    memory_size = document.getElementById('memory-size').innerHTML;
    max_process_size = memory_size / 2;

    for(i = 0; i < processes; i++) {
        max_process_size = AddProcess(max_process_size, i + 1);
    }
}

function SwapIn(process_num, process_size) {

    const memory = document.getElementById('memory');

    const part = document.createElement('div');
    part.className = 'part';
    part.id = 'cont-part-' + process_num;

    const mem_part = document.createElement('input');
    mem_part.className = 'mem-part';
    mem_part.type = 'text';
    mem_part.id = 'mem-part-' + process_num;
    mem_part.value = process_size;
    mem_part.readOnly = true;

    const proc_part = document.createElement('input');
    proc_part.className = 'proc-part';
    proc_part.classList.add('proc-alloc');
    proc_part.type = 'text';
    proc_part.id = 'proc-part-' + process_num;
    proc_part.style.padding = (process_size * spacing) + 'px 0';
    proc_part.value = 'P' + process_num;
    proc_part.readOnly = true;

    part.appendChild(mem_part);
    part.appendChild(proc_part);
    memory.appendChild(part);


    // alert('process added');
}

function ShowRemMem(rem_memory_size) {

    const memory = document.getElementById('memory');

    const part = document.createElement('div');
    part.className = 'part';

    const mem_part = document.createElement('input');
    mem_part.className = 'mem-part';
    mem_part.type = 'text';
    mem_part.value = rem_memory_size;
    mem_part.readOnly = true;

    const proc_part = document.createElement('input');
    proc_part.className = 'proc-part';
    proc_part.classList.add('rem-mem');
    proc_part.type = 'text';
    proc_part.style.padding = (rem_memory_size * spacing) + 'px 0';
    proc_part.value = 'Remaining Memory';
    proc_part.readOnly = true;

    part.appendChild(mem_part);
    part.appendChild(proc_part);
    memory.appendChild(part);

}

function FirstFit(type) {

    if(type == 'dynamic') {

        rem_memory_size = document.getElementById('memory-opt').value;
        processes = document.getElementById('processes-opt').value;

        for(i = 0; i < processes; i++) {
            // alert('processes: ' + processes + '\niteration: ' + i);

            process_size = document.getElementById('proc-' + (i + 1)).value;
            process_size = Number(process_size);
            // alert('process-' + (i + 1) + ' size: ' + process_size);

            if(rem_memory_size >= process_size) {
                SwapIn(i + 1, process_size);
                rem_memory_size = rem_memory_size - process_size;
                // alert('rem_memory_size: ' + rem_memory_size);
            }
            

        }
        if (rem_memory_size > 0) {
            ShowRemMem(rem_memory_size);
        }

    }
    else if(type == 'static') {

        partitions = Number(document.getElementById('partitions-opt').value);
        processes = Number(document.getElementById('processes-opt').value);

        for(i = 0; i < processes; i++) {
            
            proc_size = document.getElementById('proc-' + (i + 1)).value;
            proc_size = Number(proc_size);
            for(j = 0; j < partitions; j++) {
                // alert('process ' + i + '\npartition ' + j)
                
                const partition = document.getElementById('mem-part-' + (j + 1));
                if(partition.readOnly == false) {

                    part_size = partition.value;
                    part_size = Number(part_size);

                    if(proc_size <= part_size) {

                        frag_size = Number(document.getElementById('frag-size').innerHTML);
                        frag_size += part_size - proc_size;
                        document.getElementById('frag-size').innerHTML = frag_size;

                        const process = document.getElementById('proc-part-' + (j + 1));
                        process.value = 'P' + (i + 1) + ': ' + proc_size;
                        process.style.padding = (proc_size * spacing) + 'px 0';
                        process.classList.add('proc-alloc');
                        document.getElementById('mem-part-' + (j + 1)).readOnly = 'true';

                        break;
                    }
                }
            }
        }
    }
}

function NextFit() {

    partitions = Number(document.getElementById('partitions-opt').value);
    processes = Number(document.getElementById('processes-opt').value);

    next_part = 0;

    for(i = 0; i < processes; i++) {
        
        proc_size = document.getElementById('proc-' + (i + 1)).value;
        proc_size = Number(proc_size);


        for(j = next_part; j < partitions; j++) {
            // alert('process ' + i + '\npartition ' + j)
            
            const partition = document.getElementById('mem-part-' + (j + 1));
            if(partition.readOnly == false) {

                part_size = partition.value;
                part_size = Number(part_size);

                if(proc_size <= part_size) {

                    frag_size = Number(document.getElementById('frag-size').innerHTML);
                    frag_size += part_size - proc_size;
                    document.getElementById('frag-size').innerHTML = frag_size;

                    const process = document.getElementById('proc-part-' + (j + 1));
                    process.value = 'P' + (i + 1) + ': ' + proc_size;
                    process.style.padding = (proc_size * spacing) + 'px 0';
                    process.classList.add('proc-alloc');
                    document.getElementById('mem-part-' + (j + 1)).readOnly = 'true';

                    next_part = j + 1;

                    break;
                }
            }
        }
    }
    
}

function BestFit() {

    partitions = Number(document.getElementById('partitions-opt').value);
    processes = Number(document.getElementById('processes-opt').value);

    for(i = 0; i < processes; i++) {
        
        proc_size = document.getElementById('proc-' + (i + 1)).value;
        proc_size = Number(proc_size);

        best_part = 0;
        best_part_size = 100;

        for(j = 0; j < partitions; j++) {
            // alert('process ' + i + '\npartition ' + j)

            const partition = document.getElementById('mem-part-' + (j + 1));
            if(partition.readOnly == false) {

                part_size = partition.value;
                part_size = Number(part_size);

                if(proc_size <= part_size && part_size < best_part_size) {
                    // alert(' part_size > worst_part_size' +  part_size + ' > ' + worst_part_size);

                    best_part_size = part_size;
                    best_part = j + 1;
                }
            }
        }

        if(best_part != 0) {

            frag_size = Number(document.getElementById('frag-size').innerHTML);
            frag_size += best_part_size - proc_size;
            document.getElementById('frag-size').innerHTML = frag_size;

            const process = document.getElementById('proc-part-' + best_part);
            process.value = 'P' + (i + 1) + ': ' + proc_size;
            process.style.padding = (proc_size * spacing) + 'px 0';
            process.classList.add('proc-alloc');
            document.getElementById('mem-part-' + best_part).readOnly = 'true';
        }
    }
}


function WorstFit() {

    partitions = Number(document.getElementById('partitions-opt').value);
    processes = Number(document.getElementById('processes-opt').value);

    for(i = 0; i < processes; i++) {
        
        proc_size = document.getElementById('proc-' + (i + 1)).value;
        proc_size = Number(proc_size);

        worst_part = 0;
        worst_part_size = 0;

        for(j = 0; j < partitions; j++) {
            // alert('process ' + i + '\npartition ' + j)

            const partition = document.getElementById('mem-part-' + (j + 1));
            if(partition.readOnly == false) {

                part_size = partition.value;
                part_size = Number(part_size);

                if(proc_size <= part_size && part_size > worst_part_size) {
                    // alert(' part_size > worst_part_size' +  part_size + ' > ' + worst_part_size);

                    worst_part_size = part_size;
                    worst_part = j + 1;
                }
            }
        }

        if(worst_part != 0) {

            frag_size = Number(document.getElementById('frag-size').innerHTML);
            frag_size += worst_part_size - proc_size;
            document.getElementById('frag-size').innerHTML = frag_size;

            const process = document.getElementById('proc-part-' + worst_part);
            process.value = 'P' + (i + 1) + ': ' + proc_size;
            process.style.padding = (proc_size * spacing) + 'px 0';
            process.classList.add('proc-alloc');
            document.getElementById('mem-part-' + worst_part).readOnly = 'true';
        }
    }
}


function CheckAlgo(id, type) {

    if(id == 'firstfit'){
        FirstFit(type);
    }
    else if(id == 'nextfit'){
        alert('Algo: ' + id + '\nType: ' + type);
        NextFit();
    }
    else if(id == 'bestfit'){
        alert('Algo: ' + id + '\nType: ' + type);
        BestFit();
    }
    else if(id == 'worstfit'){
        WorstFit();
    }
}

function CheckMemoryPartitionSize(id) {

    partitions = document.getElementById('partitions-opt').value;
    memory_size = document.getElementById('memory-size').innerHTML;
    total_partition_size = 0;

    // Calculating total partition size
    for(i = 0; i < partitions; i++){
        size = document.getElementById('mem-part-' + (i + 1)).value;
        size = Number(size);
        total_partition_size += size;
    }

    // Checking total partition size and memory size equality
    if(total_partition_size != memory_size) {
        alert('Total partition size must be equal to memory size!');
    }
    else {
        CheckAlgo(id, 'static');
    }

} 

function CheckType(id) {

    static = document.getElementById('static-opt').checked;

    // Checking type (static/dynamic)
    if(static == true) {
        CheckMemoryPartitionSize(id);
    }
    else if (static == false) {
        CheckAlgo(id, 'dynamic');
    }
}

    












// COMMENTED EXTRA CODE

    // const techniqueName = document.getElementById(id).id;
    // output.style.textAlign = "right";
    // alert(output.style.backgroundColor);
    // document.getElementsByClassName('output').innerHTML = 'asdsdasd';



